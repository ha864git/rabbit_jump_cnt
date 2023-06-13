// 情報元： https://shimz.me/blog/microbit/5456
//          https://gunmagisgeek.com/blog/microbit/5456
//          https://playing-engineer.com/wordpress/2018/06/04/microbit-ble-chrome-browserpromise/
//          https://qiita.com/nakazawaken1/items/4a15480899722a33e8ee
let bluetoothDevice;
let tx_characteristic;
let rx_characteristic;

//micro:bit BLE UUID
const MICROBIT_UART_SERVICE = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const MICROBIT_UART_SERVICE_TX_CHARACTERISTIC = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
const MICROBIT_UART_SERVICE_RX_CHARACTERISTIC = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';

//micro:bitに接続する
document.getElementById('connect').addEventListener('click', function () {
    let options = {};

    //options.acceptAllDevices = true;

    options.filters = [
        { services: [MICROBIT_UART_SERVICE] },
        { namePrefix: "BBC micro:bit" }
    ];

    navigator.bluetooth.requestDevice(options)
        .then(device => {
            bluetoothDevice = device;
            console.log("device", device);
            return device.gatt.connect();
        })
        .then(server => {
            console.log("server", server)
            return server.getPrimaryService(MICROBIT_UART_SERVICE);
        })
        .then(service => {
            console.log("service", service)
            return Promise.all([
                service.getCharacteristic(MICROBIT_UART_SERVICE_TX_CHARACTERISTIC),
                service.getCharacteristic(MICROBIT_UART_SERVICE_RX_CHARACTERISTIC)
            ]);
        })
        .then(chara => {
            console.log("characteristic", chara)
            document.getElementById("status").innerHTML = "Connected !";

            initialize_text_area();

            tx_characteristic = chara[0];
            tx_characteristic.startNotifications();
            tx_characteristic.addEventListener('characteristicvaluechanged', onCharacteristicValueChanged);

            rx_characteristic = chara[1];
            return chara;
        })
        .catch(error => {
            console.log(error);
        });
});

// BLE disconnection process
document.getElementById('disconnect').addEventListener('click', function () {
    if (!bluetoothDevice || !bluetoothDevice.gatt.connected) return;
    bluetoothDevice.gatt.disconnect();
    document.getElementById("status").innerHTML = "Disconnected !";

    disable_text_area();

});

// Receive messages from Micro:bit
function onCharacteristicValueChanged(e) {
    let str_arr = [];
    for (let i = 0; i < this.value.byteLength; i++) {
        str_arr[i] = this.value.getUint8(i);
    }
    let str = String.fromCharCode.apply(null, str_arr);

    print_text_area(str);

}

// Send message
function send_message(message) {
    if (!bluetoothDevice || !bluetoothDevice.gatt.connected || !rx_characteristic) {
        alert('Please connect.');
        return;
    }
    let arrayBuffe = new TextEncoder().encode(message + '\n');
    rx_characteristic.writeValue(arrayBuffe);
}

// Send by pressing Enter key
window.document.onkeydown = function (event) {
    if (event.key === 'Enter') {
        if (!document.getElementById('text_area').classList.contains('display_none')) {
            let text_area = document.getElementById("text_area");
            let lines = text_area.value.split('\n');
            let message = lines[lines.length - 1].replace('> ', '');
            send_message(message);
        }
    }
}

function initialize_text_area() {
    document.getElementById('file_container').classList.remove('display_none');
    document.getElementById('text_area').value = "> "
    document.getElementById('text_area').classList.remove('display_none');
    document.getElementById('text_area').focus();
}

function disable_text_area() {
    document.getElementById('text_area').classList.add('display_none');
}

function print_text_area(str) {
    let text_area = document.getElementById("text_area");
//    text_area.value = text_area.value + str + '> ';
    text_area.value = text_area.value + str + '';
    text_area.scrollTo(0, text_area.scrollHeight); // Show the latest line
}
