var bookmarks = [];
var fetchBookmarks = () => {
    console.log(true)
    if (localStorage.getItem("bookmarks")) {
        bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        contentAdder("bookmarks", bookmarks);
    } else {
        contentAdder("bookmarks", bookmarks);
    }
}

function contentAdder(eid, arr) {
    document.querySelector(`#${eid}`).innerHTML = "";
    arr.forEach(function (element, index) {
        document.querySelector(`#${eid}`).innerHTML += `<tr><td class="col-md-2">` + element.name + `</td><td class="col-md-1"><button class="btn btn-default" onclick="visit(bookmarks,${index})">Visit</button></td><td><button class="btn btn-danger" onclick="remove(bookmarks);">Delete</button></td></tr>`;
    });
}

function Bookmark(name, url) {
    this.name = name;
    this.url = url;
}
var saveToLocal = (key, arr) => {
    localStorage.setItem(key, arr);
}
var transformLetters = (text) => {
    var firstChar = text.charAt(0);
    var otherChars = text.slice(1);
    firstChar = firstChar.toUpperCase();
    return firstChar + otherChars;
}
var addItem = (rid1, rid2) => {
    var url = ((document.querySelector(`#${rid2}`).value).trim());
    console.log(url);
    url.indexOf("http://") == -1 ? url = "http://" + url : false;
    console.log(url);
    if (document.querySelector(`#${rid1}`).value != "" && document.querySelector(`#${rid2}`).value != "") {
        bookmarks.push(new Bookmark(transformLetters((document.querySelector(`#${rid1}`).value).trim()), url));
        saveToLocal("bookmarks", JSON.stringify(bookmarks));
        contentAdder("bookmarks", bookmarks);
        document.querySelector(`#bookmarker_main_form`).reset();
    }
}
var remove = (arr, index) => {
    arr.splice(index, 1);
    saveToLocal("bookmarks", arr);
    contentAdder("bookmarks", arr);
}
var visit = (arr, index) => {
    window.open((arr[index])["url"]);
}