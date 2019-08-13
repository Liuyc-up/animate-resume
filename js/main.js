function writeCode(prefix,code,fn) {
    let domCode = document.querySelector('#code')
    let n = 0
    let id = setInterval(() => {
        n += 1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css, 'css');
        styleTag.innerHTML = prefix + code.substring(0, n)
        domCode.scrollTop = domCode.scrollHeight;
        if (n >= code.length) {
            window.clearInterval(id)
            fn.call()
        }
    }, 50)
}

function writeMarkdown(markdown,fn){
    let domPaper = document.querySelector('#paper>.mycontext')
    let n = 0
    let id = setInterval(() => {
        n += 1
        domPaper.innerHTML = markdown.substring(0, n);
        domPaper.scrollTop = domPaper.scrollHeight;
        if (n >= markdown.length) {
            window.clearInterval(id)
            fn.call()
        }
    }, 50)
}

function markdownToHtml(fn){
    let div = document.createElement('div')
    div.className = 'html markdown-body'
    let domPaper = document.querySelector('#paper>.mycontext')
    var html = markdown.toHTML(md)
    div.innerHTML = html
    domPaper.replaceWith(div)
    fn.call()
}
var result = `/*
大家好，我是练习时长两年半的个人练习。。。
欧，我的天哪，不好意思串场了。

面试官你好，我是xxx
接下来，我将以动画的形式来介绍自己

只用文字介绍太单调了
来点代码吧

首先准备一些样式
*/

*{
    transition:all 1s;
}
html{
    background:white;
    font-size:16px;
}
#code{
    border: 1px solid #aaa;
    border-radius:10px;
    padding:16px;
}

/*把代码高亮一下吧*/
.token.selector{
    color: #690;
}
.token.property{
    color: #905;
}

/*来加点呼吸效果吧*/
#code{
    animation: breath 0.5s infinite alternate-reverse;
}

/*不玩了，进行自我介绍吧*/
/*我需要一张白纸*/
#code-wrapper{
    left:0;
    position:fixed;
    width:50%;
}

#paper>.mycontext{
    display:block;
}
`
var result2 = `
/*在这张纸上写点东西吧*/
/*请看右边*/
`
var result3 = `
/*接下来，利用一个js类库将Markdown变成Html*/
`
var md =`
#自我介绍

我叫xxx
1996年7月出生
xxx学校xxx专业毕业
希望应聘xxx岗位


#技能介绍

熟悉JavaScript CSS HTML


#联系方式

- QQ:1881818
- Email:klkl@163.com
- 手机：191819189


#其他

[博客](http://liuyicheng.top)
`
//为什么writeCode是异步任务？
//而createPaper是同步任务？
writeCode('',result,()=>{
    createPaper(()=>{
        writeCode(result,result2,()=>{
            writeMarkdown(md,()=>{
                writeCode(result+result2,result3,()=>{
                    markdownToHtml(()=>{})
                })
            })
        })
    })
})

function createPaper(fn) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    var Mycontext = document.createElement('pre')
    Mycontext.className = 'mycontext'
    paper.appendChild(Mycontext)
    document.body.appendChild(paper)
    fn.call()
}