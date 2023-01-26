import React from "react";

import "./ProfilePage.css"


function ProfilePage(props) {

    function click(e) {
        const ball = e.target;
        moveAt(e);
        // переместим в body, чтобы мяч был точно не внутри position:relative
        document.body.appendChild(ball);

        ball.style.zIndex = 1000; // показывать мяч над другими элементами

        // передвинуть мяч под координаты курсора
        // и сдвинуть на половину ширины/высоты для центрирования
        function moveAt(e) {
            ball.style.left = e.pageX - ball.offsetWidth / 2 + 'px';
            ball.style.top = e.pageY - ball.offsetHeight / 2 + 'px';
        }

        // 3, перемещать по экрану
        document.onmousemove = function(e) {
            moveAt(e);
        }

        // 4. отследить окончание переноса
        ball.onmouseup = function() {
            document.onmousemove = null;
            ball.onmouseup = null;
        }
    }
    
    return (
        <div className="main-page">
            <div className="ball" onMouseDown={click}></div>  
        </div>
    );

};

export default ProfilePage;
