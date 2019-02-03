Vvveb.Gui.download =
function () {

    function isLocalUrl(url)
    {
        return url.indexOf("//") == -1;
    }

    function addUrl(url)
    {
        if (isLocalUrl(url)) assets.push(url);
    }


    var html = Vvveb.Builder.frameHtml;
    var assets = [];

    //stylesheets
    $("link[href$='.css']", html).each(function(i, e) {
        addUrl(e.getAttribute("href"));
    });

    //javascript
    $("script[src$='.js']", html).each(function(i, e) {
        addUrl(e.getAttribute("src"));
    });
    
    //images
    $("img[src]", html).each(function(i, e) {
        addUrl(e.getAttribute("src"));
    });

console.dir(assets);
return;

    var zip = new JSZip();
    zip.file("Hello.txt", "Hello World\n");
    var img = zip.folder("images");
    img.file("smile.gif", imgData, {base64: true});
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        // see FileSaver.js
        saveAs(content, "template.zip");
    });
};
/*

filename = /[^\/]+$/.exec(Vvveb.Builder.iframe.src)[0];
uriContent = "data:application/octet-stream,"  + encodeURIComponent(Vvveb.Builder.getHtml());

var link = document.createElement('a');
if ('download' in link)
{
    link.download = filename;
    link.href = uriContent;
    link.target = "_blank";
    
    document.body.appendChild(link);
    result = link.click();
    document.body.removeChild(link);
    link.remove();
    
} else
{
    location.href = uriContent;
}


var zip = new JSZip();
zip.file("Hello.txt", "Hello World\n");
var img = zip.folder("images");
img.file("smile.gif", imgData, {base64: true});
zip.generateAsync({type:"blob"})
.then(function(content) {
    // see FileSaver.js
    saveAs(content, "example.zip");
});
*/