const GenerateEjsPdfBtn = document.querySelector( '.generate-ejs-pdf' )
const form = document.querySelector( 'form' )
const submitBtn = document.querySelector( 'button[type=submit]' )

GenerateEjsPdfBtn.onclick = async () => {

    document.body.style.cursor = 'wait'
    GenerateEjsPdfBtn.style.pointerEvents = 'none'

    try {
        const request = await fetch( '/Generate-Ejs-Pdf', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            }
        } )

        const response = await request.json()

        document.body.style.cursor = 'auto'
        GenerateEjsPdfBtn.style.pointerEvents = 'auto'


        // location.href = `/GeneratedPdf/${ response.GeneratedPdf }`
        window.open( `/GeneratedPdf/${ response.GeneratedPdf }`, '_blank' )

    } catch ( error ) {

        console.error( 'Error Occured : ', error )

    }


}

form.onsubmit = async ( e ) => {

    e.preventDefault()

    try {

        document.body.style.cursor = 'wait'
        submitBtn.style.pointerEvents = 'none'

        let formData = new FormData( form )

        let url = document.querySelector( 'input[name=url]' )

        let request = await fetch( '/Generate-Url-Pdf', {
            method: 'post',
            body: JSON.stringify( { url: url.value } ),
            headers: {
                'Content-Type': 'application/json'
            }
        } )

        let response = await request.json()

        document.body.style.cursor = 'auto'
        submitBtn.style.pointerEvents = 'auto'

        window.open( `/GeneratedPdf/${ response.GeneratedPdf }`, '_blank' )

    } catch ( error ) {
        console.error( 'Error occured : ', error )
    }


}