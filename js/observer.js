function observe(data) {
  if(!data || typeof data !== 'object') return
  for(var key in data) {
    let val = data[key]
    let subject = new Subject()  // 创建订阅者
    Object.defineProperty(data, key, {
      // 将 key 里面的数据代理到data 上
      enumerable: true,
      configurable: true,
      get: function() {
        console.log(`get ${key}: ${val}`)
        if(currentObserver){
          console.log('has currentObserver')
          currentObserver.subscribeTo(subject)
        }
        return val
      },
      set: function(newVal) {
        val = newVal
        console.log('start notify...')
        subject.notify() // 通知视图进行更新
      }
    })
    if(typeof val === 'object'){
      observe(val)
    }
  }
}


let id = 0
let currentObserver = null


/**
 * 订阅者的类
 * @param
 */

class Subject {
  constructor() {
    this.id = id++
    this.observers = []
  }
  /**
   * 将观察者添加到 Subject 数组当中
   * @param {Object}
   */
  addObserver(observer) {
    this.observers.push(observer)
  }

  /**
   * 删除观察者
   * @param {Object} observer 观察者
   *
   */
  removeObserver(observer) {
    var index = this.observers.indexOf(observer)
    if(index > -1){
      this.observers.splice(index, 1)
    }
  }
  /**
   * 通知观察者更新视图
   */
  notify() {
    this.observers.forEach(observer=> {
      observer.update()
    })
  }
}
