class mvvm {
  constructor(opts) {
    this.init(opts) // 将data 里面的数据代理到vm上
    this._initComputed(opts) // 实现 Computed 计算属性
    observe(this.$data) // 对data 里面的数据进行劫持并监听
    new Compile(this)
  }
  init(opts){
    this.$el = document.querySelector(opts.el) // 获取 dom 节点
    this.$data = opts.data || {}  // 获取 data 里面的数据
    this.$methods = opts.methods || {}  // 获取方法

    //把$data 中的数据直接代理到当前 vm 对象
    // this 就是 vm
    for(let key in this.$data) {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get: ()=> {  //这里用了箭头函数，所有里面的 this 就指代外面的 this 也就是 vm
          return this.$data[key]
        },
        set: newVal=> {
          this.$data[key] = newVal
        }
      })
    }

    //让 this.$methods 里面的函数中的 this，都指向当前的 this，也就是 vm
    for(let key in this.$methods) {
      this.$methods[key] = this.$methods[key].bind(this)
    }
  }

  // 实现计算属性
  _initComputed (opts) {
    // 将copmputed 里面的属性代理到 vm 上 ， vm.xxx -> vm.computed.xxx
    //
      var me = this;
      var computed = opts.computed;
      if (typeof computed === 'object') {
          Object.keys(computed).forEach(function(key) {
              Object.defineProperty(me, key, {
                  get: typeof computed[key] === 'function'
                          ? computed[key]
                          : computed[key].get,
                  set: function() {}
              });
          });
      }
  }
}
