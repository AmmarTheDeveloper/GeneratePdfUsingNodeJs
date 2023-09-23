const express = require( 'express' )
const app = express()
const ejs = require( "ejs" )
const puppeteer = require( 'puppeteer' )
const fs = require( 'fs' )

app.set( 'view engine', 'ejs' )
app.set( 'views', __dirname + '/views' )
app.use( express.static( __dirname + '/public/' ) )
app.use( express.json() )
app.use( express.urlencoded( { extended: true } ) )

const data = {
	name: 'Ammar',
	status: 'Full Stack Developer',
	content: `Name is Ammar Ansari And He Knows HTML , CSS , BOOTSTRAP , JAVASCRIPT , NODE JS , EXPRESS , MYSQL ,
	MONGODB, GIT, GITHUB ETC`
}

app.get( "/", ( req, res ) => {
	res.render( "home" )
} )

app.get( "/pdf", ( req, res ) => {
	res.render( "pdf", { data } )
} )

app.post( '/Generate-Ejs-Pdf', async ( req, res ) => {

	let ejs = fs.readFileSync( './views/pdf.ejs', 'utf-8' )
	let ReplacedEjs = {
		'<%= data.name %>': data.name,
		'<%= data.status %>': data.status,
		'<%= data.content %>': data.content
	}

	html = ejs.replace( /<%= data.name %>|<%= data.status %>|<%= data.content %>/g, ( matched ) => {

		return ReplacedEjs[ matched ]

	} )

	const browser = await puppeteer.launch( {
		headless: true
	} )
	const page = await browser.newPage()
	let pdfName = `Generated-Pdf-${ Date.now() }.pdf`
	await page.setContent( html )
	let GeneratedPdf = await page.pdf(
		{
			path: `./public/GeneratedPdf/${ pdfName }`,
			format: 'A4',
			printBackground: true
		}
	)

	await browser.close()

	res.send( { GeneratedPdf: pdfName } )

} )

app.post( '/Generate-Url-Pdf', async ( req, res ) => {

	let website_url = req.body.url

	const browser = await puppeteer.launch( {
		headless: true
	} )

	const page = await browser.newPage()

	let pdfName = `Generated-Url-Pdf-${ Date.now() }.pdf`

	await page.goto( website_url, { waitUntil: 'networkidle0' } )
	await page.emulateMediaType( 'screen' )

	let GeneratedPdf = await page.pdf(
		{
			path: `./public/GeneratedPdf/${ pdfName }`,
			format: 'A4',
			printBackground: true
		}
	)

	await browser.close()

	res.send( { GeneratedPdf: pdfName } )

} )

app.listen( 1000 )