import { Entity } from 'draft-js'
import { getEntityRanges } from 'draft-js-utils'
import * as elements from './elements'

const blockElementMap = {
  'header-one': elements.h1,
  'header-two': elements.h2,
  'header-three': elements.h3,
  'header-four': elements.h4,
  'header-five': elements.h5,
  'header-six': elements.h6,
  'p': elements.p,
  'unstyled': elements.p
};

class HTMLGenerator {
  constructor(contentState, { inlineStyleMap, blockAttrFn }) {
    this.contentState = contentState
    this.inlineStyleMap = inlineStyleMap
    this.blockAttrFn = blockAttrFn
  }

  call() {
    return this.contentState.getBlocksAsArray().map((block) => {
      return this.parseBlock(block)
    }).join('')
  }

  parseBlock(block) {
    const type = block.getType()
    const text = block.getText()

    const characterMetadataList = block.getCharacterList()
    const entityRanges = getEntityRanges(text, characterMetadataList)

    const content   = this.applyInlineStyles(entityRanges)
    const attrs     = this.blockAttrFn(block)
    const blockHTML = this.applyBlockElementWrapper(type, content, attrs)

    return blockHTML
  }

  applyInlineStyles(entityRanges) {
    return entityRanges.map(([entityKey, styles]) => {
      const entity = entityKey ? Entity.get(entityKey) : null
      const entityType = entity ? entity.getType() : null
      return styles.map(([text, style]) => {
        const styledElement = this.elementWithStyle(text, style)
        const element = this.applyEntity(styledElement, entity)

        return element
      }).join('')
    }).join('')
  }

  applyEntity(element, entity) {
    if (entity) {
      return elements.a({attrs: { href: entity.data.url }, content: element })
    } else {
      return element
    }
  }

  elementWithStyle(text, style) {
    if (Object.keys(style.toObject()).length > 0) {
      return elements.span({ style: this.getInlineStyles(style), content: text })
    } else {
      return text
    }
  }

  getInlineStyles(style) {
    let styles = {}

    Object.keys(style.toObject()).forEach((k) => {
      styles = {
        ...styles,
        ...this.inlineStyleMap[k],
      }
    })

    return styles
  }

  applyBlockElementWrapper(type, content, attrs) {
    return blockElementMap[type]({ content, attrs })
  }
}

export default function(contentState, options) {
  return new HTMLGenerator(contentState, options).call()
}
