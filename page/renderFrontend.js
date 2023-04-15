export function frontend(isSuccess,errorMessage,song_link,songTitle){

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <title>Download Music</title>
    </head>
    <body class="h-screen w-full bg-slate-900	 flex justify-center items-center">
      <div class = "bg-slate-200 rounded p-6 min-h-min	min-w-min">
          <p class = "text-center text-lg font-semibold">Convert to MP3</p>
          <form action="/" method="POST" class="mt-3 w-full flex justify-center items-center">
            <input class="p-2" placeholder="Paste Youtube video id" name="youtubeID" type="text">
            <button class = "p-2 bg-blue-300 rounded">Convert</button>
          </form>

          <div class = "w-full h-auto text-center mt-4">
            ${isSuccess ? renderDownload(songTitle,song_link): renderError(errorMessage)}
          </div>
      </div>
    </body>
    </html>
    `
}


function renderError(errorMessage){
    return ` <p class = "p-2 font-medium text-sm bg-red-400 rounded" >${errorMessage}</p>`
}

function renderDownload(songTitle,song_link){
    return `
    <p class = "p-2 font-medium text-sm" >${songTitle}</p>
    <a href="${song_link}"><button class = "p-2 bg-green-300 rounded"">Download</button></a>
    `
}


