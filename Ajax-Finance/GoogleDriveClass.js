function isLogged()
{
    if(localStorage.getItem("accessToken")!=null)
    {
        return localStorage.getItem("accessToken");
    }
    else
    {
        return null;
    }
}

function signIn(clientId, clientSecret, redirectUri, scope,code)
{
    let url = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=" + redirectUri + "&prompt=consent&response_type=code&client_id=" + clientId + "&scope=" + scope + "&access_type=offline";
    let richiesta = inviaRichiesta(
        "POST",
        "https://www.googleapis.com/oauth2/v4/token",
        {
            code: code,
            redirect_uri: redirectUri,
            client_secret: clientSecret,
            client_id: clientId,
            scope: scope,
            grant_type: "authorization_code",
        },
        false
    );
    richiesta.done(function (data)
    {
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("expires_in", data.expires_in);
        window.history.pushState({}, document.title, "index.html");
    });
}

class Upload
{
    constructor(file)
    {
        this.file = file;
    }
    getType()
    {
        localStorage.setItem("type", this.file.type);
        return this.file.type;
    }
    getSize()
    {
        localStorage.setItem("size", this.file.size);
        return this.file.size;
    }
    getName()
    {
        return this.file.name;
    }
    doUpload()
    {
        var formData = new FormData();
        // add assoc key values, this will be posts values
        formData.append("file", this.file, this.getName());
        formData.append("upload_file", true);
        return $.ajax({
            type: "POST",
            beforeSend: function (request)
            {
                request.setRequestHeader(
                    "Authorization",
                    "Bearer" + " " + localStorage.getItem("accessToken")
                );
            },
            url: "https://www.googleapis.com/upload/drive/v2/files",
            uploadType: "media",

            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                return myXhr;
            },
            async: true,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            timeout: 60000,
        });
    }
}