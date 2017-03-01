/**
 * ScrollAction: DOM & Window object transparent containers
 */

import _ from 'underscore'

const win = document.defaultView

/**
 * Target element container
 */
class TargetContainer {

  /**
   * @param {Object} targetElement - A target DOM element
   * @param {Object} parentElement - A parent DOM element
   */
  constructor (targetElement, parentContainer) {
    /** @type {Object} */
    this.element = targetElement  // element
    /** @type {Object} */
    this.parent = parentContainer
  }

  /**
   * Relative position
   * @type {{x: number, y: number}}
   */
  get position () {
    return {
      x: Math.floor(this.rect.left) + this.parent.scroll.x,
      y: Math.floor(this.rect.top) + this.parent.scroll.y
    }
  }

  /**
   * Relative position which the origin is center of screen
   * @type {{x: number, y: number}}
   */
  get positionOrigin () {
    return {
      x: Math.floor(this.rect.width / 2) + this.position.x,
      y: Math.floor(this.rect.height / 2) + this.position.y
    }
  }

  /**
   * Rectangle position and size
   * @type {{top: number, left: number, width: number, height: number}}
   */
  get rect () {
    return this.element.getBoundingClientRect()
  }

}

/**
 * Window object container
 */
class WindowContainer {

  constructor (childrenSelector) {
    this.window = this
    this.element = win
    if (childrenSelector) {
      const children = document.querySelectorAll(childrenSelector)
      this.children = Array.from(children, child => new TargetContainer(child, this))
    }
  }

  get position () {
    return {
      x: Math.floor(this.rect.width / 2),
      y: Math.floor(this.rect.height / 2)
    }
  }

  get rect () {
    return {
      top: 0,
      left: 0,
      width: this.element.innerWidth,
      height: this.element.innerHeight,
      scrollWidth: document.body.clientWidth,
      scrollHeight: document.body.clientHeight
    }
  }

  get scroll () {
    return {
      x: this.element.scrollX || this.element.pageXOffset,
      y: this.element.scrollY || this.element.pageYOffset
    }
  }

  get scrollOrigin () {
    return {
      x: Math.floor(this.rect.width / 2) + this.scroll.x,
      y: Math.floor(this.rect.height / 2) + this.scroll.y
    }
  }

  on (eventname, callback) {
    this.element.addEventListener(eventname, callback, false)
  }

  off (eventname, callback) {
    this.element.removeEventListener(eventname, callback)
  }

}

class ParentContainer {

  constructor (parentElement, childrenSelector) {
    this.window = new WindowContainer()
    this.element = parentElement
    const children = this.element.querySelectorAll(childrenSelector)
    this.children = Array.from(children, child => new TargetContainer(child, this))
  }

  get position () {
    return {
      x: Math.floor(this.rect.left) + this.window.scroll.x,
      y: Math.floor(this.rect.top) + this.window.scroll.y
    }
  }

  get positionOrigin () {
    return {
      x: Math.floor(this.rect.width / 2) + this.position.x,
      y: Math.floor(this.rect.height / 2) + this.position.y
    }
  }

  get rect () {
    return Object.assign(this.element.getBoundingClientRect(), {
      scrollWidth: this.element.scrollWidth,
      scrollHeight: this.element.scrollHeight
    })
  }

  get scroll () {
    return {
      x: this.element.scrollLeft,
      y: this.element.scrollTop
    }
  }

  get scrollOrigin () {
    return {
      x: Math.floor(this.rect.width / 2) + this.element.scrollLeft,
      y: Math.floor(this.rect.height / 2) + this.element.scrollTop
    }
  }

  get style () {
    return global.getComputedStyle(this.element)
  }

  on (eventname, callback) {
    this.element.addEventListener(eventname, callback, false)
  }

  off (eventname, callback) {
    this.element.removeEventListener(eventname, callback)
  }

}

class Container {

  constructor (parentSelector, targetSelector) {
    this.window = new WindowContainer()

    this.parents = []

    if (toString.apply(parentSelector) === '[object Window]') {
      this.parents.push(new WindowContainer(targetSelector))
    } else if (toString.apply(parentSelector) === '[object String]') {
      const parentElements = document.querySelectorAll(parentSelector)
      this.parents = Array.from(parentElements,
          parentElement => new ParentContainer(parentElement, targetSelector))
    }

    this.children = _.flatten(this.parents.map(parent => parent.children))
  }

  on (eventname, callback) {
    this.parents.forEach(parent => parent.on(eventname, callback))
    this.window.on(eventname, callback)
  }

  off (eventname, callback) {
    this.parents.forEach(parent => parent.off(eventname, callback))
    this.window.off(eventname, callback)
  }

}

export {
  TargetContainer,
  WindowContainer,
  ParentContainer,
  Container
}
