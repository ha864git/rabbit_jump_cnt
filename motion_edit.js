let messages = [];

let col_base = 3;
let col_fore_foot = col_base + 0;
let col_hind_foot = col_base + 1;
let col_fore_leg = col_base + 2;
let col_hind_leg = col_base + 3;
let col_pitch = col_base + 4;

// button [+]
function addlist() {
    let table = document.getElementById('editlist');
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(-1);
    let cell2 = row.insertCell(-1);
    let cell3 = row.insertCell(-1);
    let cell4 = row.insertCell(-1);
    let cell5 = row.insertCell(-1);
    let cell6 = row.insertCell(-1);
    let cell7 = row.insertCell(-1);
    let cell8 = row.insertCell(-1);
    let cell9 = row.insertCell(-1);
    let cell10 = row.insertCell(-1);
    let cell11 = row.insertCell(-1);
    let row_len = table.rows.length;
    let deletebutton = '<input type="button" value="-" onclick="deleteRow(this)" />';
    let set = '<input type="button" value="<=" onclick="read_from_diagram(this)" />';
    let set_figure = '<input type="button" value="=>" onclick="write_on_diagram(this)" />';
    let hset = '<input type="button" value="EXE" onclick="and_execute(this)" />';
    let tset_angle = '<input type="text" size="2" value="90" />';
    let tset_pitch = '<input type="text" size="2" value="5" />';

    cell1.innerHTML = deletebutton;
    cell2.innerHTML = "";
    cell3.innerHTML = "";
    cell4.innerHTML = tset_angle;
    cell5.innerHTML = tset_angle;
    cell6.innerHTML = tset_angle;
    cell7.innerHTML = tset_angle;
    cell8.innerHTML = tset_pitch;
    cell9.innerHTML = set;
    cell10.innerHTML = set_figure;
    cell11.innerHTML = hset;

    adjlist();
}

function adjlist() {
    let to_up = '<input type="button" value="^" onclick="move_line_up(this)" />';
    let to_down = '<input type="button" value="v" onclick="move_line_down(this)" />';

    let table = document.getElementById('editlist');
    let row_len = table.rows.length;
    for (i = 0; i < row_len; i++) {
        if (i == 0) {
        } else if (i == 1) {
            table.children[0].children[i].cells[2].innerHTML = "";
            table.children[0].children[i].cells[1].innerHTML = to_down;
        } else {
            table.children[0].children[i].cells[1].innerHTML = "";
            table.children[0].children[i - 1].cells[1].innerHTML = to_down;
            table.children[0].children[i].cells[2].innerHTML = to_up;
        }
    }
}

// button [-]
function deleteRow(obj) {
    var tr = obj.parentNode.parentNode;
    tr.parentNode.deleteRow(tr.sectionRowIndex);

    adjlist();
}

function clearRows() {
    let table = document.getElementById('editlist');
    let row_len = table.rows.length;
    for (i = row_len - 1; i > 0; i--) {
        table.children[0].deleteRow(i);
    }
}

// button [v]
function move_line_down(obj) {
    const td = obj.parentNode;
    const tr = td.parentNode;
    let row = tr.sectionRowIndex;
    let temp = ["", "", "", "", ""];
    temp[col_fore_foot - col_base] = tr.parentNode.children[row + 1].children[col_fore_foot].firstChild.value;
    temp[col_hind_foot - col_base] = tr.parentNode.children[row + 1].children[col_hind_foot].firstChild.value;
    temp[col_fore_leg - col_base] = tr.parentNode.children[row + 1].children[col_fore_leg].firstChild.value;
    temp[col_hind_leg - col_base] = tr.parentNode.children[row + 1].children[col_hind_leg].firstChild.value;
    temp[col_pitch - col_base] = tr.parentNode.children[row + 1].children[col_pitch].firstChild.value;
    tr.parentNode.children[row + 1].children[col_fore_foot].firstChild.value = tr.children[col_fore_foot].firstChild.value;
    tr.parentNode.children[row + 1].children[col_hind_foot].firstChild.value = tr.children[col_hind_foot].firstChild.value;
    tr.parentNode.children[row + 1].children[col_fore_leg].firstChild.value = tr.children[col_fore_leg].firstChild.value;
    tr.parentNode.children[row + 1].children[col_hind_leg].firstChild.value = tr.children[col_hind_leg].firstChild.value;
    tr.parentNode.children[row + 1].children[col_pitch].firstChild.value = tr.children[col_pitch].firstChild.value;
    tr.children[col_fore_foot].firstChild.value = temp[col_fore_foot - col_base];
    tr.children[col_hind_foot].firstChild.value = temp[col_hind_foot - col_base];
    tr.children[col_fore_leg].firstChild.value = temp[col_fore_leg - col_base];
    tr.children[col_hind_leg].firstChild.value = temp[col_hind_leg - col_base];
    tr.children[col_pitch].firstChild.value = temp[col_pitch - col_base];
}

// button [^]
function move_line_up(obj) {
    const td = obj.parentNode;
    const tr = td.parentNode;
    let row = tr.sectionRowIndex;
    let temp = ["", "", "", "", ""];
    temp[col_fore_foot - col_base] = tr.parentNode.children[row - 1].children[col_fore_foot].firstChild.value;
    temp[col_hind_foot - col_base] = tr.parentNode.children[row - 1].children[col_hind_foot].firstChild.value;
    temp[col_fore_leg - col_base] = tr.parentNode.children[row - 1].children[col_fore_leg].firstChild.value;
    temp[col_hind_leg - col_base] = tr.parentNode.children[row - 1].children[col_hind_leg].firstChild.value;
    temp[col_pitch - col_base] = tr.parentNode.children[row - 1].children[col_pitch].firstChild.value;
    tr.parentNode.children[row - 1].children[col_fore_foot].firstChild.value = tr.children[col_fore_foot].firstChild.value;
    tr.parentNode.children[row - 1].children[col_hind_foot].firstChild.value = tr.children[col_hind_foot].firstChild.value;
    tr.parentNode.children[row - 1].children[col_fore_leg].firstChild.value = tr.children[col_fore_leg].firstChild.value;
    tr.parentNode.children[row - 1].children[col_hind_leg].firstChild.value = tr.children[col_hind_leg].firstChild.value;
    tr.parentNode.children[row - 1].children[col_pitch].firstChild.value = tr.children[col_pitch].firstChild.value;
    tr.children[col_fore_foot].firstChild.value = temp[col_fore_foot - col_base];
    tr.children[col_hind_foot].firstChild.value = temp[col_hind_foot - col_base];
    tr.children[col_fore_leg].firstChild.value = temp[col_fore_leg - col_base];
    tr.children[col_hind_leg].firstChild.value = temp[col_hind_leg - col_base];
    tr.children[col_pitch].firstChild.value = temp[col_pitch - col_base];
}

// button [<=]
function read_from_diagram(obj) {
    const tr = obj.parentNode.parentNode;
    tr.children[col_fore_foot].firstChild.value = document.getElementById('id_fore_foot_angle').innerHTML;
    tr.children[col_hind_foot].firstChild.value = document.getElementById('id_hind_foot_angle').innerHTML;
    tr.children[col_fore_leg].firstChild.value = document.getElementById('id_fore_leg_angle').innerHTML;
    tr.children[col_hind_leg].firstChild.value = document.getElementById('id_hind_leg_angle').innerHTML;
}

// button [=>]
function write_on_diagram(obj) {
    const tr = obj.parentNode.parentNode;
    document.getElementById('id_fore_foot_angle').innerText = tr.children[col_fore_foot].firstChild.value;
    document.getElementById('id_hind_foot_angle').innerText = tr.children[col_hind_foot].firstChild.value;
    document.getElementById('id_fore_leg_angle').innerText = tr.children[col_fore_leg].firstChild.value;
    document.getElementById('id_hind_leg_angle').innerText = tr.children[col_hind_leg].firstChild.value;
    set_angle();
}

// button [EXE]
function and_execute(obj) {
    const td = obj.parentNode;
    const tr = td.parentNode;
    document.getElementById('id_fore_foot_angle').innerText = tr.children[col_fore_foot].firstChild.value;
    document.getElementById('id_hind_foot_angle').innerText = tr.children[col_hind_foot].firstChild.value;
    document.getElementById('id_fore_leg_angle').innerText = tr.children[col_fore_leg].firstChild.value;
    document.getElementById('id_hind_leg_angle').innerText = tr.children[col_hind_leg].firstChild.value;
    set_angle();
    let message = 'p';
    message += ',' + tr.children[col_fore_foot].firstChild.value;
    message += ',' + tr.children[col_hind_foot].firstChild.value;
    message += ',' + tr.children[col_fore_leg].firstChild.value;
    message += ',' + tr.children[col_hind_leg].firstChild.value;
    message += ',' + tr.children[col_pitch].firstChild.value;
    send_message(message);
    print_text_area(message + '\n');
}

// file click event
document.getElementById('file').addEventListener('click', function () {
    // Clears the file path to raises a change event.
    document.getElementById("file").value = '';
    // Hide upload button
    document.getElementById('upload').classList.add('display_none');
});

// file change event
document.getElementById('file').addEventListener('change', function () {
    let reader = new FileReader();
    let fileList = file.files;
    // Clears the file path to raises a change event.
    reader.readAsText(fileList[0], 'UTF-8');
    reader.onload = function () {
        messages = reader.result.split(/\r\n/);
        make_editlist(messages);
    };
    // Show upload button
    document.getElementById('upload').classList.remove('display_none');
});

document.getElementById('savebtn').addEventListener('click', async () => {
    // ファイル保存ダイアログを表示して FileSystemFileHandle オブジェクトを取得
    const fh = await window.showSaveFilePicker({ suggestedName: 'test.txt' });

    // FileSystemWritableFileStream オブジェクトを取得
    const stream = await fh.createWritable();

    let table = document.getElementById('editlist');
    let row_len = table.rows.length;
    let src = "";
    for (i = 1; i < row_len; i++) {
        src += "p"
        src += "," + table.children[0].children[i].children[col_fore_foot].firstChild.value;
        src += "," + table.children[0].children[i].children[col_hind_foot].firstChild.value;
        src += "," + table.children[0].children[i].children[col_fore_leg].firstChild.value;
        src += "," + table.children[0].children[i].children[col_hind_leg].firstChild.value;
        src += "," + table.children[0].children[i].children[col_pitch].firstChild.value;
        src += "\r\n";
    }

    // テキストデータの Blob オブジェクトを生成
    const blob = new Blob([src], { type: 'text/html' });

    // テキストデータをファイルに書き込む
    await stream.write(blob);

    // ファイルを閉じる
    await stream.close();

    // 保存されたファイルのファイル名をコンソールに出力
    console.log(fh.name);
});


function make_editlist(messages) {
    let table = document.getElementById('editlist');

    clearRows();

    for (let i = 0; i < messages.length; i++) {
        let tmp = messages[i].split(',');
        if (tmp[0] === 'p' && tmp.length === 6) {
            addlist();
            let row_len = table.rows.length;
            let tr = table.children[0].children[row_len - 1];
            tr.children[col_fore_foot].firstChild.value = tmp[1];
            tr.children[col_hind_foot].firstChild.value = tmp[2];
            tr.children[col_fore_leg].firstChild.value = tmp[3];
            tr.children[col_hind_leg].firstChild.value = tmp[4];
            tr.children[col_pitch].firstChild.value = tmp[5];
        }
    }
}

function make_uploadlist() {
    let table = document.getElementById('editlist');
    let row_len = table.rows.length;
    messages = [];

    for (let i = 1; i < row_len; i++) {
        let line = 'a:';
        let tr = table.children[0].children[i];
        line += tr.children[col_fore_foot].firstChild.value;
        line += ',' + tr.children[col_hind_foot].firstChild.value;
        line += ',' + tr.children[col_fore_leg].firstChild.value;
        line += ',' + tr.children[col_hind_leg].firstChild.value;
        line += ',' + tr.children[col_pitch].firstChild.value;
        messages.push(line);
    }

}


let UploadIntervalID;
let NextUploadPointer;

function startUpload() {

    make_uploadlist();

    if (!UploadIntervalID) {
        Download_str = "";
        Download_counter = 0;
        NextUploadPointer = 0;

        const text_data = "clear";
        send_message(text_data);
        print_text_area('>>>--- upload start ---<<<\n');
        print_text_area(text_data + '\n');

        UploadIntervalID = setInterval(Upload, 1000);

    }
}

function Upload() {


    if (NextUploadPointer < messages.length) {
        let text_data = messages[NextUploadPointer];
        text_data = text_data.replace('p,','a:');
        send_message(text_data);
        print_text_area(text_data+ '\n');
        ++NextUploadPointer;
    } else {
        NextUploadPointer = 0;
        stopUpload();
        print_text_area('>>>--- upload end ---<<<\n');
        send_message('list');
        print_text_area('list\n');
    }

}

function stopUpload() {
    clearInterval(UploadIntervalID);
    UploadIntervalID = null;
}

// upload button
document.getElementById('upload').addEventListener('click', function () {
    startUpload();
});

// lplay button
document.getElementById('lplay').addEventListener('click', function () {
    send_message('lplay');
    print_text_area('lplay\n');
});

// stop button
document.getElementById('lstop').addEventListener('click', function () {
    send_message('stop');
    print_text_area('stop\n');
});

// step button
document.getElementById('step_on').addEventListener('click', function () {
    send_message('step on\n');
});

// step button
document.getElementById('step_off').addEventListener('click', function () {
    send_message('step off\n');
});

// step button
document.getElementById('next_step').addEventListener('click', function () {
    send_message('step\n');
});

