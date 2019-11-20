# simpleMVVM


这个系统主要是用来做啥的

simpleMVVM 主要分成三个部分，求中包括 complie、observer、watcher。
其中observer的作用是通过Object.defineProperty来监听data里面数据的变化，故需要遍历来设置监听。当获取数据时，get监听会将观察者（observer类）添加到订阅者（subject类）的数组当中，当数据发生变化的时候，set监听会通过notify 函数通知视图再次更新。
而complie就是对AST（抽象语法树）进行解析：如果是DOM节点，则对其指令进行解析，并对视图进行首次更新，如果是文本节点，则另外对其进行解析。当我们对指令进行解析的过程中，触发get监听，会将观察者(watcher)添加到订阅者(subject)的数组当中。
最后，watcher 就是定义观察者，求中包括获取


总图：






complie
![image](https://github.com/fengyunlsm/simpleMVVM/blob/master/image/init.png)







observer






wathcer




mvvm


关于指令的实现



关于计算属性的实现
