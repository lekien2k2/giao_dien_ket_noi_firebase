

  // // function active(name) {
  // //   var element = document.getElementById(name)
  // //   element.classList.toggle("s_active");
  // }



      // Tạo đối tượng Date để lấy thời gian hiện tại
      var currentTime = new Date();
      var currentTimeElement = document.getElementById("current-time");
      function updateTime(){
      // Định dạng thời gian hiện tại theo chuẩn ISO và gán vào phần tử HTML
      var currentTime = new Date();
        var currentHour = currentTime.getHours();
        var currentMinute = currentTime.getMinutes();
        var currentSecond = currentTime.getSeconds();

        // Hiển thị giờ, phút, giây trong phần tử HTML
        currentTimeElement.innerHTML = currentHour + ":" + currentMinute + ":" + currentSecond;
      }
      setInterval(updateTime, 1000);
   
      var currentTimeE = document.getElementById("time");

      // Tạo đối tượng Date để lấy thời gian hiện tại

      // Định dạng thời gian hiện tại theo chuẩn ISO và gán vào phần tử HTML
      var currentDay = currentTime.getDate();
      var currentMonth = currentTime.getMonth() + 1;

      // Hiển thị giờ, phút, giây trong phần tử HTML
      currentTimeE.innerHTML = currentDay + "/" + currentMonth;

  function room_active(name) {
    var element = document.getElementById(name)
    element.classList.toggle("room_active");
  }


  function openControl(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("control");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("room");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "flex";
    evt.currentTarget.className += " active";
}

	

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0Qk8nWg7IJ6UX5CMqIC7zVWLEqvWfVIw",
  authDomain: "layout-1fa75.firebaseapp.com",
  projectId: "layout-1fa75",
  databaseURL: "https://layout-1fa75-default-rtdb.firebaseio.com/",
  storageBucket: "layout-1fa75.appspot.com",
  messagingSenderId: "473782150076",
  appId: "1:473782150076:web:2a46b25af31c4337ea01b9",
  measurementId: "G-F4XPE3Z9ZQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Auto load Temperature-------------------------
firebase.database().ref("/layout/maylanh").on("value",function(snapshot){
  var nd = snapshot.val();  
  document.getElementById("nhietdo").innerHTML = nd;
  console.log(nd);
});

// LED ĐƠN
            var ledRef = firebase.database().ref('/layout/led');
            var ledElem = document.querySelector('.LED');

            // Đăng ký callback khi giá trị của nút "led" thay đổi trên database
            ledRef.on('value', function(snapshot) {
              ledElem.classList.toggle('s_active', snapshot.val() === 'ON');
            });

            // Đăng ký sự kiện click cho phần tử HTML
            ledElem.onclick = function() {
              ledRef.transaction(function(currentVal) {
                // Toggle giá trị nút "led" trên database
                return currentVal === 'ON' ? 'OFF' : 'ON';
              });
            };
// GAS
            var GASRef = firebase.database().ref('/layout/GAS');
            var GASElem = document.querySelector('.GAS');

            // Đăng ký callback khi giá trị của nút "led" thay đổi trên database
            GASRef.on('value', function(snapshot) {
              GASElem.classList.toggle('gactive', snapshot.val() === 'ON');
            });
            
// SLIDER PMW
            // Lấy tham chiếu tới thẻ input slider
            var slider = document.getElementById("myRange");

            // Lấy tham chiếu tới thẻ img
            var pmw = document.querySelector('.PMW');

            // Lấy tham chiếu tới nút Firebase Realtime Database
            var dbRef_pmw = firebase.database().ref('/layout/pmw');

            // Đăng ký callback để cập nhật giá trị slider lên Firebase khi slider thay đổi
            slider.addEventListener('input', function() {
            dbRef_pmw.set(this.value);
            });

            // Cập nhật màu nền dựa vào giá trị của slider và cập nhật lên Firebase
            dbRef_pmw.on('value', function(snapshot) {
            var value = snapshot.val();

            // Tính toán màu nền dựa vào giá trị của slider
            var hue = (value / 10) * 60;
            var brightness = 100 - value * 5;
            var backgroundColor = 'hsl(' + hue + ', 100%, ' + brightness + '%)';

            // Cập nhật màu nền của class .PMW
            pmw.style.backgroundColor = backgroundColor;
            });

// MÁY LẠNH
            // // Lấy tham chiếu tới nút "up" và nút "down"
            var upButton = document.getElementById("up");
            var downButton = document.getElementById("down");

            // Lấy tham chiếu tới thẻ DOM có class là .temp
            var temp = document.querySelector('.TEMP');

            // Lấy tham chiếu đến database
            var dbRef_temp = firebase.database().ref('/layout/maylanh/temp');

            // Đăng ký callback cho sự kiện click vào nút "up"
            upButton.addEventListener('click', function() {
              // Lấy dữ liệu hiện tại từ database
              dbRef_temp.once('value').then(function(snapshot) {
                if (snapshot.val() < 31) {
                  // Cập nhật giá trị mới vào database
                  dbRef_temp.set(snapshot.val() + 1);
                }
              });
            });

            // Đăng ký callback cho sự kiện click vào nút "down"
            downButton.addEventListener('click', function() {
              // Lấy dữ liệu hiện tại từ database
              dbRef_temp.once('value').then(function(snapshot) {
                if (snapshot.val() > 17) {
                  // Cập nhật giá trị mới vào database
                  dbRef_temp.set(Math.max(17, snapshot.val() - 1));
                }
              });
            });

            // Đăng ký callback cho sự kiện dữ liệu thay đổi từ database
            dbRef_temp.on('value', function(snapshot) {
              var value = snapshot.val();

              // Hiển thị giá trị vừa lấy được từ Firebase
              temp.textContent = value;
            });


            var dbtemp = document.getElementById('tempTB');
            var dbhumi = document.getElementById('humiTB');

            var dbRef_tempTB = firebase.database().ref('/layout/temp');
            var dbRef_humiTB = firebase.database().ref('/layout/humi');

            dbRef_tempTB.on('value', function(snapshot) {
              var vl = snapshot.val();
  
              dbtemp.innerHTML = vl +"°C";
              });
            
              dbRef_humiTB.on('value', function(snapshot) {
              var vl = snapshot.val();
  
              dbhumi.innerHTML = vl +"%";
              });