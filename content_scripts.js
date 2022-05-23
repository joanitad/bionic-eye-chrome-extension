function convertToBionicReading()
{
    let selectionText = window.getSelection().toString();
    if(selectionText != "") {
        const encodedParams = new URLSearchParams();
        encodedParams.append("content", selectionText);
        encodedParams.append("response_type", "html");
        encodedParams.append("request_type", "html");
        // TODO set this up via chrome extension options
        encodedParams.append("fixation", "1");
        encodedParams.append("saccade", "10");
    
        const options = {
            method: 'POST',
            headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Host': 'bionic-reading1.p.rapidapi.com',
            'X-RapidAPI-Key': ''
            },
            body: encodedParams
        };
    
        fetch('https://bionic-reading1.p.rapidapi.com/convert', options)
        .then (response => response.text().then(function(text) {
            var sel = window.getSelection();
            var e = document.createElement('div');
            e.innerHTML = text;
    
            var range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(e);
            
        }))
        .catch(err => console.error(err));
    }
    
}

convertToBionicReading();
