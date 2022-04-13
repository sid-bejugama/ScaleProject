import serial
import time
import requests
import sys

def checkScaleStatus():
    try:
        ser = serial.Serial("/dev/cu.usbserial-D30B6WXD", 9600, timeout = 1)
        return ser
    except serial.serialutil.SerialException:
        return "The scale is not turned on!"

def getMass():
    ser = checkScaleStatus()
    if type(ser) is str: return ser
    ser.write(bytes("CP\n".encode()))
    mass = str(ser.readline())
    ser.close()
    validChars = []
    for c in mass[2:mass.index('\\')]:
        if c != ' ':
            validChars.append(c)
    return "".join(validChars)
    
while True:
    try:
        r = requests.post('https://scale-data.herokuapp.com/', json = {'Mass': getMass()[:-1], 'Units': getMass()[-1]})
        print(r.text)

    except:
        continue
    time.sleep(1)

