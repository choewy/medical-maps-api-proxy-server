"use strict";

const container = document.getElementById('map');

function drawMap(x = 126.570667, y = 33.450701) {
    return new kakao.maps.Map(container, {
        center: new kakao.maps.LatLng(y, x),
        level: 3
    });
};

function drawMarker(x, y) {
    const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(y, x)
    });
    marker.setMap(map);
};

let map = drawMap();

const items = $('#items'),
    itemDetail = $('#item-details'),
    itemDetailsBox = $('.item-details');

function itemClick(row) {
    itemDetail.empty();
    const { addr, mgtStaDd, recuClCd, ratPsblYn, pcrPsblYn, XPosWgs84, YPosWgs84 } = row;
    map = drawMap(XPosWgs84, YPosWgs84);
    drawMarker(XPosWgs84, YPosWgs84);
    const temp = [
        `<h3>주소</h3><p>${addr}</p>`,
        `<h3>운영시작일자</h3><p>${mgtStaDd}</p>`,
        `<h3>요양종별구분</h3><p>${recuClCd == 11 ? "종합병원" : (recuClCd == 21 ? "병원" : "의원")}</p>`,
        `<h3>RAT(신속항원검사)가능 여부</h3><p>${ratPsblYn === "Y" ? "가능" : "불가능"}</p>`,
        `<h3>PCR 검사 가능 여부</h3><p>${pcrPsblYn === "Y" ? "가능" : "불가능"}</p>`
    ];
    const detail = $("<li>");
    detail.addClass('selected');
    detail.html(temp.join(''));
    itemDetail.append(detail);
    itemDetailsBox.show();
};

$(document).ready(() => {
    items.empty();
    $.ajax('/api?pageNo=1&numOfRows=10', {
        type: "GET",
        data: {},
        success: (res) => {
            const { success, rows, error } = res;
            if (!success) {
                return alert("데이터를 불러오지 못했습니다.");
            }
            rows.forEach(row => {
                const { yadmNm, sidoCdNm, sgguCdNm, telno } = row;
                const temp = `<h3>${yadmNm}</h3>
                              <p>${sidoCdNm} ${sgguCdNm}</p>
                              <p>TEL. ${telno}</p>`;
                const item = $("<li>");
                item.html(temp);
                item.on('click', () => {
                    itemClick(row);
                })
                items.append(item);
            });
        }
    });
});
