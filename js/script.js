'use strict;';
/* jshint node: true */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define */
$(window).keypress(function (e) {
    //use e.which
    var keyCode = e.which;
    // console.log(e, keyCode, e.which)
    if (keyCode == 13) {
        console.log("You pressed enter");
        $('#get-result-btn').click();
    }
});

$(document).ready(function () {


    let input_text="";
    let input_type="";
    let algorithm="";
    let result_text='';
    let key='';
    $charArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

    console.log("document is ready!");

    $('#reset-btn').on('click', function () {
        //for testing//////////////////////////////////////////////////////////////////////////////////////////////
        console.log("reset button clicked!");
    });

    $('#get-result-btn').on('click', function () {
        result_text="";
        $('#result_text').val(result_text);

        //for testing//////////////////////////////////////////////////////////////////////////////////////////////
        console.log("get result button clicked!");

        input_text=$('#input_text').val();

        //check input type values
        if(document.getElementsByName('input-type')[0].checked){
            input_type="encryption";
        }
        else input_type = "decryption";
        //for testing//////////////////////////////////////////////////////////////////////////////////////////////
        console.log(input_type);

        //check algorithm value
        if(document.getElementsByName('algorithm')[0].checked){
            algorithm="caesar";
        }
        else if(document.getElementsByName('algorithm')[1].checked){
            algorithm="playfair";
        }
        else if(document.getElementsByName('algorithm')[2].checked){
            algorithm="rowtransposition";
        }
        else if(document.getElementsByName('algorithm')[3].checked){
            algorithm="vigenere";
        }
        //for testing//////////////////////////////////////////////////////////////////////////////////////////////
        console.log(algorithm);


        key=$('#key').val();
        //for testing//////////////////////////////////////////////////////////////////////////////////////////////
        console.log(key);



        //ceasar encryption
        if(input_type==='encryption' && algorithm==='caesar'){
            result_text=caesarEncryption(input_text,key);
            $('#result_text').val(result_text);
        }
        //ceasar decryption
        else if(input_type==='decryption' && algorithm==='caesar'){
            result_text=caesarDecryption(input_text,key);
            $('#result_text').val(result_text);
        }

        //row transposition encryption
        else if(input_type==='encryption' && algorithm==='rowtransposition'){
            result_text=rowtranspositionEncryption(input_text,key);
            $('#result_text').val(result_text);
        }

        //row transposition decryption
        else if(input_type==='decryption' && algorithm==='rowtransposition'){
            result_text=rowtranspositionDecryption(input_text,key);
            $('#result_text').val(result_text);
        }

        //play fair encryption
        else if(input_type==='encryption' && algorithm==='playfair'){
            result_text=playfairEncryption(input_text,key);
            $('#result_text').val(result_text);
        }

        //play fair decryption
        else if(input_type==='decryption' && algorithm==='playfair'){
            result_text=playfairDecryption(input_text,key);
            $('#result_text').val(result_text);
        }
        //vigenere encryption
        else if(input_type==='encryption' && algorithm==='vigenere'){
            result_text=vigenereEncryption(input_text,key);
            $('#result_text').val(result_text);
        }
        //vigenere decryption
        else if(input_type==='decryption' && algorithm==='vigenere'){
            result_text=vigenereDecryption(input_text,key);
            $('#result_text').val(result_text);
        }
    });
});


function caesarEncryption(text, key) {
    key= parseInt(key);
    var result = "";
    for (var i = 0; i < text.length; i++) {
        let c =0;
        c = text.charCodeAt(i);
        if      (65 <= c && c <=  90) result += String.fromCharCode((c - 65 + key) % 26 + 65);  // Uppercase
        else if (97 <= c && c <= 122) result += String.fromCharCode((c - 97 + key) % 26 + 97);  // Lowercase
        else                          result += text.charAt(i);  // Copy
    }
    return result;
}

function caesarDecryption(text, key) {
    key= parseInt(key);
    var result = "";
    for (var i = 0; i < text.length; i++) {
        let c =0;
        c = text.charCodeAt(i);
        if      (65 <= c && c <=  90) result += String.fromCharCode((c - 65 - key + (26*9999999999)) % 26 + 65);  // Uppercase
        else if (97 <= c && c <= 122) result += String.fromCharCode((c - 97 - key + (26*9999999999)) % 26 + 97);  // Lowercase
        else                          result += text.charAt(i);  // Copy
    }
    return result;
}

function rowtranspositionEncryption(text, key) {
    $key_array=[];
    $finalArray="";
    var keyCharPos=0;
    for(var i=0;i<key.length;i++){
        $key_array[i]=key.charAt(keyCharPos);
        keyCharPos++;
    }

    var started_array = "";
    var columns = key.length;                             //get columns count
    var rows= (Math.ceil(text.length/key.length));  //get rows count
    $arr = array2d(rows,columns,"");                 //make an empty array


    var charPos=0;
    for(var i=0;i<rows;i++){   //fill 2d array with elements
        for(var j=0;j<columns;j++){
            $arr[i][j]=text.charAt(charPos);
            charPos++;
        }
    }


    for(var h=0; h<columns;h++){
        var min_value = Math.min.apply(Math,$key_array);
        var indexOfMin = $key_array.indexOf(min_value.toString());
        $finalArray+=getCol($arr,indexOfMin);
        $key_array[indexOfMin]=Infinity;
    }
        $finalArray= $finalArray.toString().replace(/,+/g,"");

    return $finalArray;
}

function rowtranspositionDecryption(text, key) {
    ////////////////////////////////////////////////////////////////////        not yet done
    return "SORRY! row transposition Decryption hadn't been coded yet...";

}

function playfairEncryption(text, key) {
    var cypher="";
    text=text.toLowerCase().replace(/j/g,'i'); //convert all >> j << to >> i <<
    for (let i=0;i<text.length;i+=2){ //check in two characters are the same
        if(text[i]==text[i+1]){
            // text = [text.slice(0, text[i+1]), 'x', text.slice(text[i+1])].join('');
            text= text.replace(text[i],(text[i]+'x'));
            i=0;
        }
        console.log(text);
    }
    if(text.length%2==1)
    {
        text+='x';
    }
    console.log(text);
    $charArr = ['a','b','c','d','e','f','g','h','i','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

    var table=array2d(5,5,"");
    key = key.split();
// concatenate key + characters
    let chars= (key+$charArr).toString().replace(/,/g,"").split('');

    // console.log(chars);
    for (let i=0,flag=0;i<5;i++){
        for (let j=0;j<5;j++){

            //check if character exists in table
            for(let p=0;p<chars.length;p++){
                if(!checkExistance(table,5,5,chars[flag])){
                    table[i][j]=chars[flag];
                    break;
                }
                // console.log(flag);
                flag++
            }
        }
    }

    for (let i = 0;i<text.length;i+=2){
        let pos = checkPositionEnc(table,text[i],text[i+1]);
        cypher+=pos;
        // console.log(pos);
    }


    // console.log(table);



    return cypher;
}

function playfairDecryption(text, key) {
    var plain="";
    text=text.toLowerCase().replace(/j/g,'i'); //convert all >> j << to >> i <<
    $charArr = ['a','b','c','d','e','f','g','h','i','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

    var table=array2d(5,5,"");
    key = key.split();
// concatenate key + characters
    let chars= (key+$charArr).toString().replace(/,/g,"").split('');

    console.log(chars);
    for (let i=0,flag=0;i<5;i++){
        for (let j=0;j<5;j++){

            //check if character exists in table
            for(let p=0;p<chars.length;p++){
                if(!checkExistance(table,5,5,chars[flag])){
                    table[i][j]=chars[flag];
                    break;
                }
                // console.log(flag);
                flag++
            }
        }
    }

    for (let i = 0;i<text.length;i+=2){
        let cmp = checkPositionDec(table,text[i],text[i+1]);
        plain+=cmp;
        // console.log(pos);
    }
    for (let i=0;i<plain.length;i++){ //remove extra >> X << which was added in encryption
        if(plain[i]===plain[i+2] && plain[i+1]==='x'){
            plain= plain.replace(plain[i]+plain[i+1]+plain[i+2],plain[i]+plain[i+2]);
            i=0;
        }
        console.log(plain);
    }

console.log(plain);


    return plain;
}


function vigenereEncryption(text, key) {
    // convert to lowercase and remove spaces
    text = text.toLowerCase().replace(/\s/g, '').split("");
    key = key.toLowerCase().replace(/\s/g, '');

    // long key and repeat it to equal plain text
    key=longarray(text,key);
    var res='';
    for(var i=0;i<text.length;i++){
        res += $charArr[(($charArr.indexOf(text[i]) + $charArr.indexOf(key[i]))%26)];
    }
    return res;
}

function vigenereDecryption(text, key) {
    // convert to lowercase and remove spaces
    text = text.toLowerCase().replace(/\s/g, '').split("");
    key = key.toLowerCase().replace(/\s/g, '');

    // long key and repeat it to equal plain text
    key=longarray(text,key);
    var res='';
    for(var i=0;i<text.length;i++){
        res += $charArr[((($charArr.indexOf(text[i]) - $charArr.indexOf(key[i]))+26)%26)]; // +26 so as not to get negative value
    }
    return res;
}




function isLetter(c) {
    return isUppercase(c) || isLowercase(c);
}


//make 2d array
function array2d( rows, cols, defaultValue){

    var arr = [];

    // Creates all lines:
    for(var i=0; i < rows; i++){

        // Creates an empty line
        arr.push([]);

        // Adds cols to the empty line:
        arr[i].push( new Array(cols));

        for(var j=0; j < cols; j++){
            // Initializes:
            arr[i][j] = defaultValue;
        }
    }

    return arr;
}

//get column from 2d array
function getCol(matrix, col){
    var column = [];
    for(var i=0; i<matrix.length; i++){
        column.push(matrix[i][col]);
    }
    return column;
}



// long key and repeat it to equal plain text
function longarray(arr,key){

    var res=[];
    for(var i=0;i<arr.length;i++){
        res[i]=key[i%(key.length)];
    }
    return res;
}

function checkExistance(arr,rows,cols,val) {
    for (let m=0;m<rows;m++){
        for (let n=0;n<cols;n++){
            if(arr[m][n]===val){
                return true;
            }
        }
    }
}

function checkPositionEnc(arr,char1,char2) {
    var c1='',
        c2='',
        pos1x = -1,
        pos1y = -1,
        pos2x = -1,
        pos2y = -1;

    for (let i=0;i<5;i++){
        for (let j=0;j<5;j++){
            if (arr[i][j]===char1) { pos1y=i;pos1x=j; }
            if (arr[i][j]===char2) { pos2y=i;pos2x=j; }
        }
    }
    if(pos1x==pos2x){
        c1=arr[((pos1y+1)%5)][pos1x];
        c2=arr[((pos2y+1)%5)][pos2x];
        return (c1+c2).toString();
    }
    else if(pos1y==pos2y){
        c1=arr[pos1y][((pos1x+1)%5)];
        c2=arr[pos2y][((pos2x+1)%5)];
        return (c1+c2).toString();

    }
    else
        c1=arr[pos1y][pos2x];
        c2=arr[pos2y][pos1x];
        return (c1+c2).toString();
}

function checkPositionDec(arr,char1,char2) {
    var c1='',
        c2='',
        pos1x = -1,
        pos1y = -1,
        pos2x = -1,
        pos2y = -1;

    for (let i=0;i<5;i++){
        for (let j=0;j<5;j++){
            if (arr[i][j]===char1) { pos1y=i;pos1x=j; }
            if (arr[i][j]===char2) { pos2y=i;pos2x=j; }
        }
    }
    if(pos1x==pos2x){
        c1=arr[((pos1y-1+5)%5)][pos1x];
        c2=arr[((pos2y-1+5)%5)][pos2x];
        return (c1+c2).toString();
    }
    else if(pos1y==pos2y){
        c1=arr[pos1y][((pos1x-1+5)%5)];
        c2=arr[pos2y][((pos2x-1+5)%5)];
        return (c1+c2).toString();

    }
    else
        c1=arr[pos1y][pos2x];
        c2=arr[pos2y][pos1x];
    return (c1+c2).toString();
}

function insert(main_string, ins_string, pos) {
    if(typeof(pos) === "undefined") {
        pos = 0;
    }
    if(typeof(ins_string) === "undefined") {
        ins_string = '';
    }
    return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
}
