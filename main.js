//0.开始监听
const form = document.getElementById('task-form');
const taskInput = document.getElementById('task');
const filterBtn = document.getElementById('filter');
const removeBtns = document.querySelectorAll('.delete-icon');
const finishBtns = document.querySelectorAll('.finish-icon');
const clearBtn = document.querySelector('.clear-tasks');
const taskUl = document.querySelector('.collection');
const circumBtns = document.querySelector('.circums').getElementsByTagName('li');
//判断条件
var count = 0;
var arrDel = [];

//监听函数
function startListen() {
  // 1.添加 -- form表单提交
    form.addEventListener('submit', addTask);
  
  // 2.删除单个 -- 鼠标点击
  // 5. 完成 -- 点击
  for(var i = 0;i<removeBtns.length;i++) {
    removeBtns[i].addEventListener('click', removeTask);
    finishBtns[i].addEventListener('click', finishTask);
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
  title.innerHTML = "my todo";
  actionIcon.innerHTML = "&#xe627;";
  filterField.style.opacity = "1";
}
function goJunk() {
  filterField.style.opacity = "0";
  title.innerHTML = "recycle bin";
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

