/**
 *
 * @file 数据劫持
 * @author lishaoming
 */
class Observer{
  /**
  * 数据劫持
  * @param {Object} vm 节点
  * @param {String} key v-model、v-on 的值
  * @param {cb} 更新视图的回调函数
  */
  constructor(vm, key, cb) {
    this.subjects = {}
    this.vm = vm
    this.key = key
    this.cb = cb
    this.value = this.getValue()
  }
  /**
   * 更新视图
   */
  update(){
    let oldVal = this.value
    let value = this.getValue()
    if(value !== oldVal) {
      this.value = value
      // 调用回调函数对视图进行更新
      // 对视图进行更新
      this.cb.bind(this.vm)(value, oldVal)
    }
  }
  /**
   *
   * @param {subject}
   */
  subscribeTo(subject) {
    if(!this.subjects[subject.id]){
      console.log('subscribeTo.. ', subject)
       subject.addObserver(this)  // 将订阅者添加到数组当中
       this.subjects[subject.id] = subject
    }
  }
  /**
   * 获取vm.data中的某个值，并触发 get函数
   */
  getValue(){
    currentObserver = this
    let value = this.vm[this.key]   //等同于 this.vm.$data[this.key]，这个时候会调用vm.get
    currentObserver = null
    return value
  }
}
