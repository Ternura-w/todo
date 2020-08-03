//登录注册页
const loginPage = document.querySelector('.loginPage');
const avatar = document.querySelector('.avatar');
const aImg = avatar.querySelector('.iconfont');
const loginName = document.querySelector('#login');
const signUpName = document.querySelector('#signUp');
const inputa = document.querySelectorAll('.input input');
const formLogin = document.querySelector('.form-login');
const formSign = document.querySelector('.form-sign');
const forget = document.querySelector('.forget');
const container = document.querySelectorAll('.container')[1];
const exitBtn = document.querySelector('#exit');
const cancelBtn = document.querySelector('#cancel');
let login = document.querySelector('#usera');
let loginSuccess = JSON.parse(sessionStorage.getItem('loginSuccess')) || false;
var loginCheck = false;
var arr = ['&#xe602;','&#xe603;','&#xe608;',
          '&#xe609;','&#xe60c;','&#xe60d;',
          '&#xe60e;','&#xe614;','&#xe616;',
          '&#xe615;','&#xe61a;','&#xe61b;',
          '&#xe61c;','&#xe61d;','&#xe61e;',
          '&#xe61f;','&#xe617;','&#xe618;'];
var len = arr.length-1;
function getRandom(len) {
  return Math.floor(Math.random() * len);
  //得到两个数之间的随机整数，包含这两个整数
}
init();
function init() {
 
  //隐藏注册页
  formLogin.style.display = 'block';
  formSign.style.display = 'none';
  //判断是否登录
  if (loginSuccess) {
    login.innerHTML = `${sessionStorage.getItem('loginInner')}<span></span>`;
    const m = sessionStorage.getItem('loginInner');
    aImg.innerHTML = JSON.parse(localStorage.getItem(m))[1];
    exitBtn.style.display = 'block';
    cancelBtn.style.display = 'block';
    loginPage.style.display = 'none';
    container.style.display = 'block';
  } else {
      login.innerHTML = `未登录<span></span>`;
      aImg .innerHTML = '';
      //退出登录与注销按钮
      exitBtn.style.display = 'none';
      cancelBtn.style.display = 'none';
      aImg.innerHTML = '&#xe6a3;';
       //登录页面与todo页面
      loginPage.style.display = 'block';
      container.style.display = 'none';
  }
}


start();
function start() {
  //1.选项卡切换
  loginName.addEventListener('click',cardLogin);
  signUpName.addEventListener('click',cardSign);
  
  //2.点击输入框，文字上移
  for(var i = 0, len = inputa.length; i<len; i++) {
    inputa[i].addEventListener('focus',focusInput);
    inputa[i].addEventListener('blur',blurInput);
  }
  //3.点击头像，显示注册登录
  avatar.addEventListener('click',avatara);
}

function cardLogin() {
  signUpName.classList.remove('active');
  loginName.classList.add('active');
  formLogin.style.display = 'block';
  formSign.style.display = 'none';
}

function cardSign() {
  loginName.classList.remove('active');
  signUpName.classList.add('active');
  formLogin.style.display = 'none';
  formSign.style.display = 'block';
 
}

function focusInput() {
  this.parentNode.classList.add('focus');
}

function blurInput() {
  if(this.value === '') {
    this.parentNode.classList.remove('focus');
  }
}

function avatara() {
  if(loginCheck) {
    loginPage.style.display = 'none';
    container.style.display = 'block';
    loginCheck = false;
  }else {
    loginPage.style.display = 'block';
    container.style.display = 'none';
    loginCheck = true;
  }
  
}

function autoFocus() {
  for(var i = 0, len = inputa.length; i<len; i++) {
    if(inputa[i] !== '') {
      inputa[i].focus();
    }
  }
}

// 账号密码输入框相关
let zh = document.querySelectorAll('.zh');
let mm = document.querySelectorAll('.mm');


// 设置注册登录函数
let loginBtn = document.querySelector(".logina");
let registerBtn = document.querySelector(".signa");
let loginMes = document.querySelectorAll('.login-mes');

// 登录函数
let userNameArr = [];
loginBtn.addEventListener("click", () => {
  let userName = zh[0].value;
  let userPassword = mm[0].value;
  //将储存的记录存入数组中
  for (let i = 0, len = localStorage.length; i < len; i++) {
      userNameArr[i] = localStorage.key(i);
  }
  if (userNameArr.includes(userName)) {
      let storePassword = JSON.parse(localStorage.getItem(userName))[0];
      if (userPassword == storePassword) {
          loginMes[0].innerHTML = '登录成功';
          loginSuccess = true;
          login.innerHTML = `${userName}<span></span>`;
          exitBtn.style.display = 'block';
          cancelBtn.style.display = 'block'; 
          image = JSON.parse(localStorage.getItem(userName))[1];
          aImg.innerHTML = image;
          sessionStorage.setItem('loginSuccess', true);
          sessionStorage.setItem('loginInner', userName);
          setTimeout(() => {
            loginPage.style.display = 'none';
            container.style.display = 'block';
            loginCheck = true;
          }, 500);
          // zh[0].value = '';
          // mm[0].value = '';
      } else if (userName == '请输入用户名') {
          loginMes[0].innerHTML = '请输入用户名';
      } else {
          loginMes[0].innerHTML = '密码错误';
      }
  } else {
      loginMes[0].innerHTML = '用户名不存在';
  }
});

// 注册函数
registerBtn.addEventListener("click", register)
function register() {
  let userName = zh[1].value;
  let userPassword = mm[1].value;
  let reg = /^[a-zA-Z0-9-_]{1,16}$/;
  for (let i = 0, len = localStorage.length; i < len; i++) {
    userNameArr[i] = localStorage.key(i);
  }
  if (userNameArr.includes(userName)){
    loginMes[1].innerHTML = '用户已存在'
  } else if (userName != '' && reg.test(userPassword)) {
      var img = arr[getRandom(len)];
      localStorage.setItem(userName, JSON.stringify([userPassword,img]));
      loginMes[1].innerHTML = '注册成功，正在返回登录页…';
      loginMes[0].innerHTML = '';
      setTimeout(() => {
          formSign.style.display = 'none';
          formLogin.style.display = 'block';
      }, 1000)
      zh[0].value = userName;
      mm[0].value = userPassword; 
  } else {
      loginMes[1].innerHTML = '请输入正确的的用户名或密码';
  }
};

// 设置退出登录
exitBtn.addEventListener('click', exita)
function exita() {
  login.innerHTML = `未登录<span></span>`;
  loginSuccess = false;
  sessionStorage.setItem('loginSuccess', false);
  sessionStorage.setItem('loginInner', '未登录');
  for (let i = 0; i < 2; i++) {
      zh[i].value = '';
      mm[i].value = '';
      mm[i].type = 'text';
      loginMes[i].innerHTML = ''; 
  }
  aImg.innerHTML = '&#xe6a3;';
  exitBtn.style.display = 'none';
  cancelBtn.style.display = 'none';
  loginPage.style.display = 'block';
  container.style.display = 'none';
  loginCheck = false;
}

//注销
cancelBtn.addEventListener('click',function() {
  const m = sessionStorage.getItem('loginInner');
  localStorage.removeItem(m);
  exita();
})


// todo页面
//0.开始监听
const form = document.getElementById('task-form');
const taskInput = document.getElementById('task');
const filterBtn = document.getElementById('filter');
const removeBtns = document.querySelectorAll('.delete-icon');
const finishBtns = document.querySelectorAll('.finish-icon');
const clearBtn = document.querySelector('.clear-tasks');
const taskUl = document.querySelector('.collection');
const circumBtns = document.querySelector('.circums').getElementsByTagName('li');
const editInput = document.querySelectorAll('.task');
//判断条件
var count = 0;
var arrDel = [];

//监听函数
function startListen() {
  // 1.添加 -- form表单提交
    form.addEventListener('submit', addTask);
  
  // 2. 删除单个 -- 鼠标点击
  // 5. 完成 -- 点击
  // 7. 编辑功能--双击
  for(var i = 0;i<removeBtns.length;i++) {
    removeBtns[i].addEventListener('click', removeTask);
    finishBtns[i].addEventListener('click', finishTask);
    editInput[i].addEventListener('dblclick',editTask);
  }
  
  // 3.清除所有 -- 鼠标点击
  // clearBtn.addEventListener('click', clearAllTask);

  // 4.筛选 -- 按键松开
  filterBtn.addEventListener('keyup', filterTasks);

  // 6.显示不同的todo --鼠标点击
  for(var i = 0;i < circumBtns.length;i++) {
    circumBtns[i].addEventListener('click',showTasks);
  }

}

function addTask(e) {
  if(taskInput.value != '') {
  // 0.输入内容
  const newTask = taskInput.value;

  // 1.生成
  let li = document.createElement('li');
  li.className = 'collection-item';
  li.innerHTML = `<i class="iconfont finish-icon">&#xe653;</i>
                  <span class="task">${newTask}</span>
                  <i class="iconfont delete-icon">&#xe612;</i>`;

  // 2.生成
  taskUl.prepend(li);

  // 3.清除填写框里的内容
  taskInput.value = '';

  // 4. 防止刷新
  e.preventDefault();

  // 5.给新添加的li添加删除功能
  const removeBtns = document.querySelectorAll('.delete-icon');
  const finishBtns = document.querySelectorAll('.finish-icon');
  for(var i = 0;i<removeBtns.length;i++) {
    removeBtns[i].addEventListener('click', removeTask);
    finishBtns[i].addEventListener('click', finishTask);
  }
 }else {
   alert('Please input some words');
 }
}

function removeTask(e) {
  if(e.target.classList.contains('delete-icon')) {
    arrDel.push(e.target.parentNode);
    e.target.parentNode.remove();
  }
}


function finishTask(e) {
  var spanWord = e.target.parentNode.querySelector('.task');
  //判断点击的按钮目前的状态
  if(e.target.classList.contains('finished-icon')) {
    count = 0;
  }else {
    count = 1;
  }
  // 删除 恢复
  if(count%2) {
    e.target.innerHTML= '&#xe63d;';
    e.target.classList.add('finished-icon');
    spanWord.classList.add('finish');
  }else {
    e.target.innerHTML= '&#xe653;';
    e.target.classList.remove('finished-icon');
    spanWord.classList.remove('finish');
  }
}

function clearAllTask() {
  taskUl.innerHTML = '';
}

function filterTasks(e) {
  const inputText = e.target.value.toLowerCase();//降低对大小写的敏感度

  document.querySelectorAll('.collection-item').forEach(function(taskLi) {
    var spans = taskLi.getElementsByTagName('span');
    for(var i = 0; i<spans.length;i++) {
      var item = spans[i].innerText.toLowerCase();
      if(item.indexOf(inputText) != -1) {
        taskLi.classList.remove('hide');
      }else {
        taskLi.classList.add('hide');
      }
    }
  })
}

function showTasks(e) {
  clearClass();
  e.target.classList.add('selected');
}

// 清除selected类名
function clearClass() {
  for(var i = 0; i<circumBtns.length; i++) {
    circumBtns[i].className = '';
  }
}

function editTask(e) {
  var str = e.target.innerHTML;
  //双击时禁止选定文字
  window.getSelection?window.getSelection().removeAllRanges():document.section.empty();
  e.target.innerHTML = '<input type = "text">';
  var input = e.target.children[0];
  input.value = str;
  input.select();//让文本框中的文字处于选定状态
  //当我们离开文本框就把文本框里面的值给span
  input.onblur = function() {
    this.parentNode.innerHTML = this.value;
  }
   //按下回车也可以把文本框的值给span
   input.onkeyup = function(e) {
    if(e.keyCode === 13) {//键盘对象
      this.blur();//手动调用表单失去焦点事件 不需要鼠标离开操作
    }
  }
}

startListen();


// 1.分类
const allBtn = document.getElementById('all-tasks');
const activeBtn = document.getElementById('active-tasks');
const comBtn = document.getElementById('com-tasks');
const delBtn = document.getElementById('del-tasks');
const actionIcon = document.querySelector('.action-icon');
const title = document.querySelector('#task-title');
const filterField = document.querySelectorAll('.input-field')[1];
var number = document.getElementsByTagName('strong')[0];

function getLists() {
  getAll();
  // 0.所有todo
  allBtn.addEventListener('click', getAll);

  // 1. 未完成todo
  activeBtn.addEventListener('click',getActive);

  // 2. 已完成todo
  comBtn.addEventListener('click',getCom);

  // 3. 已删除todo
  delBtn.addEventListener('click',getDel);

}

function getAll() {
  goPage();
  const lis = taskUl.getElementsByTagName('li');
  document.querySelectorAll('.collection-item').forEach(function(taskLi) {
    taskLi.classList.remove('hide');
  })
  number.innerHTML = lis.length;
}

//用数组将li分成完成与未完成，然后返回数组集合
function getdiff() {
  const recycleUl = document.querySelector('.recycle');
  recycleUl.classList.add('hidden');
  taskUl.classList.remove('hidden');

  var arrCom = [];
  var arrAc = [];
  
  const finishBtns = taskUl.querySelectorAll('.finish-icon');

  for(var i = 0; i < finishBtns.length; i++) {
   if(finishBtns[i].classList.contains('finished-icon')){
     arrCom.push(finishBtns[i].parentNode);
   }else {
    arrAc.push(finishBtns[i].parentNode);
   }
  }
  return [arrAc,arrCom]
}

//控制回收站与列表的显示以及外观
function goPage() {
  const recycleUl = document.querySelector('.recycle');
  recycleUl.classList.add('hidden');
  taskUl.classList.remove('hidden');
  title.innerHTML = "LIST";
  actionIcon.innerHTML = "&#xe627;";
  filterField.style.opacity = "1";
}
function goJunk() {
  filterField.style.opacity = "0";
  title.innerHTML = "RECYCLE";
  const recycleUl = document.querySelector('.recycle');
  recycleUl.classList.remove('hidden');
  taskUl.classList.add('hidden');
  actionIcon.innerHTML = "&#xe672;";
  
}

function getActive() {
  goPage();

  getAll();
  var arr1 = getdiff()[0];
  var arr2 = getdiff()[1];
  for(var i = 0,len = arr1.length;i< len;i++) {
    arr1[i].classList.remove('hide');
  }
  for(var i = 0,len = arr2.length;i< len;i++) {
    arr2[i].classList.add('hide');
  }
  number.innerHTML = arr1.length;
}

function getCom() {
  goPage();

  getAll();
  var arr1 = getdiff()[0];
  var arr2 = getdiff()[1];
  for(var i = 0,len = arr1.length;i< len;i++) {
    arr1[i].classList.add('hide');
  }
  for(var i = 0,len = arr2.length;i< len;i++) {
    arr2[i].classList.remove('hide');
  }
  number.innerHTML = arr2.length;
}

function getDel() {
  const lis = taskUl.getElementsByTagName('li');
  const recycleUl = document.querySelector('.recycle');
  for(var i = 0;i<lis.length;i++) {
    lis[i].classList.add('hide');
  }
  for(var i = 0, len = arrDel.length; i<len; i++) {
    recycleUl.insertAdjacentElement('beforeend',arrDel[i]);
  }
  number.innerHTML = arrDel.length;
  goJunk();
}

getLists();


// //侧边栏用户界面
const sideBtn = document.querySelector('.sidebtn');
const userPlay = document.querySelector('.userpage');

var onoff = false;

function userstart() {
  sideBtn.addEventListener('click',uesrPagea);
}

function uesrPagea() {
  if(onoff) {
    userPlay.style.display = 'block';
    userPlay.parentNode.classList.add('sidebara');
    onoff = false;
  } else {
    userPlay.style.display = 'none';
    userPlay.parentNode.classList.remove('sidebara');
    onoff = true;
  }
}
  

userstart();