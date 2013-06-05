(function(){
  function sassTag() {
    var el = document.querySelector("style[type='text/scss']")
    if(el == undefined) {
      el = document.querySelector("style[type='text/sass']")
    }

    return el
  }

  function handleError(res) {
    console.log("[debug] sassy: failed to render")
    console.log("[debug] sassy: " + res.responseText)
  }

  function handleLoad(res) {
    if(res.target.status == 200) {
      console.log("[debug] sassy: render successful")
      var css = document.createElement("style"),
          el  = sassTag(),
          pr  = el.parentNode

      css.type = "text/css"
      css.innerText = res.target.responseText

      pr.insertBefore(css, el)
      pr.removeChild(el)
    }
  }

  document.addEventListener("DOMContentLoaded", function(){
    var el = sassTag(),
        contentType = el.type,
        payload  = el.innerText,
        endpoint = "http://sassy.herokuapp.com/generate"

    var req = new XMLHttpRequest()
    req.open("POST", endpoint)
    req.header = req.setRequestHeader
    req.setRequestHeader("Content-Type", contentType)
    req.addEventListener("error", handleError)
    req.addEventListener("load", handleLoad)
    req.send(payload)
  })
})()
