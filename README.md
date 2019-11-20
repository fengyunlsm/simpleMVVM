### simpleMVVM的实际效果如下（实时计算和双向绑定数据）：

![image](https://github.com/fengyunlsm/simpleMVVM/blob/master/image/simpleMVVM.gif)




### simpleMVVM具体的流程图如下：

![image](https://github.com/fengyunlsm/simpleMVVM/blob/master/image/total.png)

simpleMVVM 主要分成三个部分，求中包括 complie、observer、watcher。
其中observer的作用是通过Object.defineProperty来监听data里面数据的变化，故需要遍历来设置监听。当获取数据时，get监听会将观察者（observer类）添加到订阅者（subject类）的数组当中，当数据发生变化的时候，set监听会通过notify 函数通知视图再次更新。
而complie就是对AST（抽象语法树）进行解析：如果是DOM节点，则对其指令进行解析，并对视图进行首次更新，如果是文本节点，则另外对其进行解析。当我们对指令进行解析的过程中，触发get监听，会将观察者(watcher)添加到订阅者(subject)的数组当中。
最后，watcher 就是定义观察者，求中包括获取更新视图的函数，获取最新的值





### complie的核心代码如下：<br>
![image](https://github.com/fengyunlsm/simpleMVVM/blob/master/image/complie.png)

对模板进行解析，如果是DOM节点，则对指令进行解析，如果是文本节点，则另外进行解析。
当进行指令解析的时候，如果v-on指令，则将对应的事件绑定到DOM节点上。
当进行指令解析的时候，如果v-model指令，则将初始化更新视图，并将观察者(observer)添加到订阅者Subject中。关于如何将观察者添加到订阅者上，将在介绍wathcer的时候进行说明。




### observer的核心代码如下：

![image](https://github.com/fengyunlsm/simpleMVVM/blob/master/image/observer.png)

触发get监听时，负责将观察者添加到订阅者的数组当中
触发set监听时，调用notify函数触发视图更新




### 然后，介绍一下wathcer：

![image](https://github.com/fengyunlsm/simpleMVVM/blob/master/image/watcher.png)

主要作用是触发addScribeTO添加订阅者，和触发nofity->update函数，则会进行视图更新




### 最后，介绍一下MVVM：

![image](https://github.com/fengyunlsm/simpleMVVM/blob/master/image/init.png)

主要的作用是整合watcher，observer，complie。其次的作用是，首先通过Object.defineProperty将data里面的属性绑定到vm上，使得可以通过this.xxx访问到对应的属性；然后初始化计算属性；其次通过observer对data里面的数据监听。最后，开始编译complie，对指令（v-on,v-model,v-bind）进行解析。




### 关于指令的实现

可以在complie.js 当中添加新的指令v-on,v-model,v-bind,v-html,v-text




### 关于计算属性的实现

![image](https://github.com/fengyunlsm/simpleMVVM/blob/master/image/computed.png)
