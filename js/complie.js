class Compile {
  /**
   * 初始化编译
   * @param {Object} vm 实例化mvvm对象
   */
  constructor(vm){
    this.vm = vm
    this.node = vm.$el
    this.compile()
  }
  /**
   * 编译
   *
   */
  compile(){
    this.traverse(this.node)
  }

  /**
  *
  * @param {Object} node 表示 节点类型有元素节点 属性节点 文本节点 注释节点
  */
  traverse(node){
    if(this.isElementNode(node)){
      this.compileNode(node)   //解析节点上的v-开头的指令
      node.childNodes.forEach(childNode=>{
        this.traverse(childNode)
      })
    }else if(this.isTextNode(node)){ //处理文本
      this.compileText(node)
    }
  }
  compileText(node){
    let reg = /{{(.+?)}}/g
    let match
    console.log(node)
    while(match = reg.exec(node.nodeValue)){
      let raw = match[0]
      let key = match[1].trim()
      node.nodeValue = node.nodeValue.replace(raw, this.vm[key])
      new Observer(this.vm, key, function(val, oldVal){
        node.nodeValue = node.nodeValue.replace(oldVal, val)
      })
    }
  }

  /**
  *
  * @param {Object} node
  *
  */
  compileNode(node){
    let attrs = [...node.attributes] //类数组对象转换成数组，也可用其他方法
    console.log('attrs: ', attrs) // [v-model, v-on:click, type] 里面的值都是对象
    attrs.forEach(attr=> {
      //attr 是个对象，attr.name 是属性的名字如 v-model， attr.value 是对应的值，如 name
      if(this.isModelDirective(attr.name)){
        // 如果是v-model
        this.bindModel(node, attr)
      } else if(this.isEventDirective(attr.name)){
        // 如果是 v-on 指令
        this.bindEventHander(node, attr)
      }
      // 如果是 v-text v-html v-class 指令,那该怎么搞
    })
  }
  /**
  *
  * @param {Object} node
  * @param {attr} Object
  ***/
  bindModel(node, attr){
    let key = attr.value       //attr.value === 'name'
    node.value = this.vm[key]
    new Observer(this.vm, key, function(newVal){
      node.value = newVal
    })
    node.oninput = (e)=>{
      this.vm[key] = e.target.value  //因为是箭头函数，所以这里的 this 是 compile 对象
    }
  }
  /**
  * DOM节点绑定事件
  * @param {Object} node
  * @param {Obejct} attr
  */
  bindEventHander(node, attr){       //attr.name === 'v-on:click', attr.value === 'sayHi'
    let eventType = attr.name.substr(5)       // click
    let methodName = attr.value
    node.addEventListener(eventType, this.vm.$methods[methodName])
  }

  //判断属性名是否是指令
  isModelDirective(attrName){
     return attrName === 'v-model'
  }

  isEventDirective(attrName){
    return attrName.indexOf('v-on') === 0
  }

  isTextNode (node) {
    // 是否为文本节点
    return node.nodeType === 3
  }

  isElementNode (node) {
    // 是否为 DOM 节点
    return node.nodeType == 1
  }
}
