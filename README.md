# simpleMVVM

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
