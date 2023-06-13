'use strict';

const mag = 2.0;
const img_center = 300;

const img_body_width = 120 * mag;
const img_body_margin_top = 280;
const img_body_margin_left = img_center - img_body_width / 2;
const img_hind_leg_body_transform_origin = 15 * mag + 'px ' + (15 + 3.5) * mag + 'px';

$('#body2').css({ 'width': img_body_width + 'px' });
$('#body2').css({ 'margin-top': img_body_margin_top + 'px' });
$('#body2').css({ 'margin-left': img_body_margin_left + 'px' });
$('#body2').css({ 'transform-origin': img_hind_leg_body_transform_origin });

const img_leg_width = 30 * mag;
const img_hind_leg_margin_top = img_body_margin_top + 3.5 * mag;
const img_hind_leg_margin_left = img_body_margin_left;
const img_hind_leg_transform_origin = img_leg_width * mag / 2 + 'px ' + img_leg_width * mag / 2 + 'px';

$('#hind_leg').css({ 'width': img_leg_width + 'px' });
$('#hind_leg').css({ 'margin-top': img_hind_leg_margin_top + 'px' });
$('#hind_leg').css({ 'margin-left': img_hind_leg_margin_left + 'px' });
$('#hind_leg').css({ 'transform-origin': img_hind_leg_transform_origin });

const img_fore_leg_margin_top = img_hind_leg_margin_top;
const img_fore_leg_margin_left = img_body_margin_left + img_body_width - img_leg_width * mag / 2;
const img_fore_leg_transform_origin = img_hind_leg_transform_origin;

$('#fore_leg').css({ 'width': img_leg_width + 'px' });
$('#fore_leg').css({ 'margin-top': img_fore_leg_margin_top + 'px' });
$('#fore_leg').css({ 'margin-left': img_fore_leg_margin_left + 'px' });
$('#fore_leg').css({ 'transform-origin': img_fore_leg_transform_origin });

const img_foot_width = 50 * mag;
const img_hind_foot_margin_top = img_hind_leg_margin_top + 50 * mag;
const img_hind_foot_margin_left = img_hind_leg_margin_left - 20 * mag;
const img_hind_foot_transform_origin = 35 * mag + 'px ' + 15 * mag + 'px';

$('#hind_foot').css({ 'width': img_foot_width + 'px' });
$('#hind_foot').css({ 'margin-top': img_hind_foot_margin_top + 'px' });
$('#hind_foot').css({ 'margin-left': img_hind_foot_margin_left + 'px' });
$('#hind_foot').css({ 'transform-origin': img_hind_foot_transform_origin });

const img_fore_foot_margin_top = img_hind_foot_margin_top;
const img_fore_foot_margin_left = img_fore_leg_margin_left;
const img_fore_foot_transform_origin = 15 * mag + 'px ' + 15 * mag + 'px';

$('#fore_foot').css({ 'width': img_foot_width + 'px' });
$('#fore_foot').css({ 'margin-top': img_fore_foot_margin_top + 'px' });
$('#fore_foot').css({ 'margin-left': img_fore_foot_margin_left + 'px' });
$('#fore_foot').css({ 'transform-origin': img_fore_foot_transform_origin });

const img_floor_width = 200 * mag;
const img_floor_margin_top = img_hind_foot_margin_top + (30 + 3.5) * mag;
const img_floor_margin_left = img_center - img_floor_width / 2;

$('#floor').css({ 'width': img_floor_width + 'px' });
$('#floor').css({ 'margin-top': img_floor_margin_top + 'px' });
$('#floor').css({ 'margin-left': img_floor_margin_left + 'px' });


$('img').removeClass('hidden');

function set_angle() {

  const fore_foot_angle = parseInt($("#id_fore_foot_angle").text());
  const hind_foot_angle = parseInt($("#id_hind_foot_angle").text());
  const fore_leg_angle = parseInt($("#id_fore_leg_angle").text());
  const hind_leg_angle = parseInt($("#id_hind_leg_angle").text());

  const dlt_fore_leg_angle = fore_leg_angle - 90;
  const dlt_hind_leg_angle = 90 - hind_leg_angle;
  const dlt_fore_foot_angle = fore_foot_angle - 90;
  const dlt_hind_foot_angle = 90 - hind_foot_angle;

  const mode = $('input:radio[name="reference_plane"]:checked').val();

  if (mode == 'hind_sole') {

    $('#hind_foot').css({ 'transform': 'none' });

    const img_hind_leg_hind_foot_base_transform_origin = img_leg_width / 2 + 'px ' + 65 * mag + 'px';
    $('#hind_leg').css({ 'transform-origin': img_hind_leg_hind_foot_base_transform_origin });
    $('#hind_leg').css({ 'transform': 'rotate(' + (0 - dlt_hind_foot_angle) + 'deg)' });

    const img_body_hind_foot_base_transform_origin = img_leg_width / 2 + 'px ' + 18.5 * mag + 'px';
    const img_body_transrateX = Math.sin(Math.PI / 180 * (0 - dlt_hind_foot_angle)) * 50 * mag;
    const img_body_transrateY = (1 - Math.cos(Math.PI / 180 * (0 - dlt_hind_foot_angle))) * 50 * mag;
    const img_body_rotate = dlt_hind_foot_angle + dlt_hind_leg_angle;
    $('#body2').css({ 'transform-origin': img_body_hind_foot_base_transform_origin });
    $('#body2').css({ 'transform': 'translatex(' + img_body_transrateX + 'px) translatey(' + img_body_transrateY + 'px) rotate(' + (0 - img_body_rotate) + 'deg)' });

    const img_fore_leg_hind_foot_base_transform_origin = img_leg_width / 2 + 'px ' + img_leg_width / 2 + 'px';
    const img_fore_leg_transrateX = 0 - (1 - Math.cos(Math.PI / 180 * (0 - img_body_rotate))) * 90 * mag + img_body_transrateX;
    const img_fore_leg_transrateY = Math.sin(Math.PI / 180 * (0 - img_body_rotate)) * 90 * mag + img_body_transrateY;
    const img_fore_leg_rotate = dlt_hind_foot_angle + dlt_hind_leg_angle + dlt_fore_leg_angle;
    $('#fore_leg').css({ 'transform-origin': img_fore_leg_hind_foot_base_transform_origin });
    $('#fore_leg').css({ 'transform': 'translatex(' + img_fore_leg_transrateX + 'px) translatey(' + img_fore_leg_transrateY + 'px) rotate(' + (0 - img_fore_leg_rotate) + 'deg)' });

    const img_fore_foot_hind_foot_base_transform_origin = img_leg_width / 2 + 'px ' + img_leg_width / 2 + 'px';
    const img_fore_foot_transrateY = 0 - (1 - Math.cos(Math.PI / 180 * (0 - img_fore_leg_rotate))) * 50 * mag + img_fore_leg_transrateY;
    const img_fore_foot_transrateX = 0 - Math.sin(Math.PI / 180 * (0 - img_fore_leg_rotate)) * 50 * mag + img_fore_leg_transrateX;
    const img_fore_foot_rotate = dlt_hind_foot_angle + dlt_hind_leg_angle + dlt_fore_leg_angle + dlt_fore_foot_angle;
    $('#fore_foot').css({ 'transform-origin': img_fore_foot_hind_foot_base_transform_origin });
    $('#fore_foot').css({ 'transform': 'translatex(' + img_fore_foot_transrateX + 'px) translatey(' + img_fore_foot_transrateY + 'px) rotate(' + (0 - img_fore_foot_rotate) + 'deg)' });

  }

  if (mode == 'fore_sole') {

    $('#fore_foot').css({ 'transform': 'none' });

    const img_fore_leg_fore_foot_base_transform_origin = img_leg_width / 2 + 'px ' + 65 * mag + 'px';
    $('#fore_leg').css({ 'transform-origin': img_fore_leg_fore_foot_base_transform_origin });
    $('#fore_leg').css({ 'transform': 'rotate(' + dlt_fore_foot_angle + 'deg)' });

    const img_body_fore_foot_base_transform_origin = (img_body_width - img_leg_width / 2) + 'px ' + (15 + 3.5) * mag + 'px';
    const img_body_transrateX = Math.sin(Math.PI / 180 * dlt_fore_foot_angle) * 50 * mag;
    const img_body_transrateY = (1 - Math.cos(Math.PI / 180 * dlt_fore_foot_angle)) * 50 * mag;
    const img_body_rotate = dlt_fore_foot_angle + dlt_fore_leg_angle;
    $('#body2').css({ 'transform-origin': img_body_fore_foot_base_transform_origin });
    $('#body2').css({ 'transform': 'translatex(' + img_body_transrateX + 'px) translatey(' + img_body_transrateY + 'px) rotate(' + img_body_rotate + 'deg)' });

    const img_hind_leg_fore_foot_base_transform_origin = img_leg_width / 2 + 'px ' + img_leg_width / 2 + 'px';
    const img_hind_leg_transrateX = (1 - Math.cos(Math.PI / 180 * img_body_rotate)) * 90 * mag + img_body_transrateX;
    const img_hind_leg_transrateY = 0 - Math.sin(Math.PI / 180 * img_body_rotate) * 90 * mag + img_body_transrateY;
    const img_hind_leg_rotate = dlt_fore_foot_angle + dlt_fore_leg_angle + dlt_hind_leg_angle;
    $('#hind_leg').css({ 'transform-origin': img_hind_leg_fore_foot_base_transform_origin });
    $('#hind_leg').css({ 'transform': 'translatex(' + img_hind_leg_transrateX + 'px) translatey(' + img_hind_leg_transrateY + 'px) rotate(' + img_hind_leg_rotate + 'deg)' });

    const img_hind_foot_fore_foot_base_transform_origin = 35 * mag + 'px ' + img_leg_width / 2 + 'px';
    const img_hind_foot_transrateY = 0 - (1 - Math.cos(Math.PI / 180 * img_hind_leg_rotate)) * 50 * mag + img_hind_leg_transrateY;
    const img_hind_foot_transrateX = 0 - Math.sin(Math.PI / 180 * img_hind_leg_rotate) * 50 * mag + img_hind_leg_transrateX;
    const img_hind_foot_rotate = dlt_fore_foot_angle + dlt_fore_leg_angle + dlt_hind_leg_angle + dlt_hind_foot_angle;
    $('#hind_foot').css({ 'transform-origin': img_hind_foot_fore_foot_base_transform_origin });
    $('#hind_foot').css({ 'transform': 'translatex(' + img_hind_foot_transrateX + 'px) translatey(' + img_hind_foot_transrateY + 'px) rotate(' + img_hind_foot_rotate + 'deg)' });

  }

}

$(function () {
  $('div[name="angle"]').on('DOMSubtreeModified propertychange', function () {
    if ($(this).text().length > 0) {
      set_angle();
    }
  });
});

$(function () {
  $('input[name="reference_plane"]').change(function () {
    set_angle();
  });
});

$('input[type="number"]').bind('input', function () {
  set_angle();
});

$("#id_reset_leg_angle").click(function () {
  $("#id_fore_leg_angle").text("90");
  $("#id_hind_leg_angle").text("90");
  set_angle();
});

$("#id_reset_foot_angle").click(function () {
  $("#id_fore_foot_angle").text("90");
  $("#id_hind_foot_angle").text("90");
  set_angle();
});

let continuous_btn = '';
let timeoutID = null;

function incdec(btn, out) {
  let v = parseInt($("#" + out).text());
  if (isNaN(v)) {
    v = 90;
  }
  if ($("#" + btn).text() == '+') {
    if (v < 180) {
      ++v;
    } else {
      v = 180;
    }
    $("#" + out).text(v);
  } else {
    if (v > 0) {
      --v;
    } else {
      v = 0;
    }
    $("#" + out).text(v);
  }
  set_angle();
}

function tover_next(btn, out) {
  timeoutID = setTimeout(function () {
    incdec(btn, out);
    tover_next(btn, out);
    //  }, 100);
  }, 10);
}

function timerset_incdec(btn, out) {
  incdec(btn, out);
  timeoutID = setTimeout(function () {
    incdec(btn, out);
    tover_next(btn, out);
    //  }, 600);
  }, 300);
}

function clearRepeatBtn() {
  continuous_btn = '';
  clearTimeout(timeoutID);
}

$(function () {
  $('#id_inc_hind_leg').on('touchstart mousedown', function (e) {
    event.preventDefault();
    timerset_incdec('id_inc_hind_leg', 'id_hind_leg_angle');
  });
  $('#id_inc_hind_leg').on('touchend mouseup mouseout', function (e) {
    event.preventDefault();
    clearRepeatBtn();
  });

  $('#id_dec_hind_leg').on('touchstart mousedown', function (e) {
    event.preventDefault();
    timerset_incdec('id_dec_hind_leg', 'id_hind_leg_angle');
  });
  $('#id_dec_hind_leg').on('touchend mouseup mouseout', function (e) {
    event.preventDefault();
    clearRepeatBtn();
  });

  $('#id_inc_fore_leg').on('touchstart mousedown', function (e) {
    event.preventDefault();
    timerset_incdec('id_inc_fore_leg', 'id_fore_leg_angle');
  });
  $('#id_inc_fore_leg').on('touchend mouseup mouseout', function (e) {
    event.preventDefault();
    clearRepeatBtn();
  });

  $('#id_dec_fore_leg').on('touchstart mousedown', function (e) {
    event.preventDefault();
    timerset_incdec('id_dec_fore_leg', 'id_fore_leg_angle');
  });
  $('#id_dec_fore_leg').on('touchend mouseup mouseout', function (e) {
    event.preventDefault();
    clearRepeatBtn();
  });

  $('#id_inc_hind_foot').on('touchstart mousedown', function (e) {
    event.preventDefault();
    timerset_incdec('id_inc_hind_foot', 'id_hind_foot_angle');
  });
  $('#id_inc_hind_foot').on('touchend mouseup mouseout', function (e) {
    event.preventDefault();
    clearRepeatBtn();
  });

  $('#id_dec_hind_foot').on('touchstart mousedown', function (e) {
    event.preventDefault();
    timerset_incdec('id_dec_hind_leg', 'id_hind_foot_angle');
  });
  $('#id_dec_hind_foot').on('touchend mouseup mouseout', function (e) {
    event.preventDefault();
    clearRepeatBtn();
  });

  $('#id_inc_fore_foot').on('touchstart mousedown', function (e) {
    event.preventDefault();
    timerset_incdec('id_inc_fore_foot', 'id_fore_foot_angle');
  });
  $('#id_inc_fore_foot').on('touchend mouseup mouseout', function (e) {
    event.preventDefault();
    clearRepeatBtn();
  });

  $('#id_dec_fore_foot').on('touchstart mousedown', function (e) {
    event.preventDefault();
    timerset_incdec('id_dec_fore_leg', 'id_fore_foot_angle');
  });
  $('#id_dec_fore_foot').on('touchend mouseup mouseout', function (e) {
    event.preventDefault();
    clearRepeatBtn();
  });

});
