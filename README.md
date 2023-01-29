# Naming Venus

<p class='about-data-paragraph'>Kavya Beheraj &nbsp;&nbsp; <a href="https://twitter.com/KavyaBeheraj" target="_blank">Twitter</a>  &nbsp;|&nbsp;  <a href="https://www.linkedin.com/in/kavyabeheraj/" target="_blank">LinkedIn</a>  &nbsp;|&nbsp;  <a href="mailto:kavya.beheraj@gmail.com" target="_blank">Email</a></p>

<br>

CUNY Graduate Center<br>
[M.S. in Data  Analysis & Visualization](https://www.gc.cuny.edu/data-analysis-and-visualization/curriculum-and-degree-information)<br>
Capstone, Fall 2022<br>
[Whitepaper](https://drive.google.com/file/d/1LyjU7W1-WpiVsUDRMyGhILta10qkK-Sy/view?usp=sharing) &nbsp; | &nbsp; [Project Link](https://koffeeya.github.io/naming-venus/index.html)

<br>

## Background

Although humans have been observing Venus for more than 5,000 years, mapping its surface has nearly always been impossible since the planet is shrouded in thick clouds.

A breakthrough came just fifty years ago with the invention of radar imaging, leading to the discovery (and naming) of hundreds of new features in a relatively short length of time.


The rapid naming of Venus is a case study on the impact of planetary nomenclature — the process of naming features on other worlds. While the act of naming streamlines communication and humanizes alien landscapes, it is subject to bias, and not all of Earth gets equal representation.

On Venus, nearly all 1,976 recorded features are named after famous women, female first names, heroines, or goddesses. However, 45% of those names are European in origin — and only 2% come from South America.


My capstone project, Naming Venus — which can be accessed at this link: https://koffeeya.github.io/naming-venus/index.html — is an interactive web application that aims to draw attention to the impact of nomenclature.

<br>

## Methods

<p class='about-data-paragraph'>This project's data source is the International Astronomical Union’s <a href='https://planetarynames.wr.usgs.gov/SearchResults?Target=15_Venus' target="_blank">Gazetteer of Planetary Nomenclature</a>. Note that some of the language used by the IAU may be out of date.</p>

<p class='about-data-paragraph'>Extended descriptions for 769 features were collected using the Python <a href="https://pypi.org/project/wikipedia/" target="_blank">wikipedia</a> package and individually edited for clarity. The script can be <a href="https://colab.research.google.com/drive/1B_W_wJ4GrhwCpoVzWHSiuPyr9ZkNCNaN#scrollTo=8-8bQhROcP_4" target="_blank">found here</a>.</p>

<p class='about-data-paragraph'>The site is made in <a href="https://svelte.dev/" target="_blank">Svelte</a>. The globe uses Vasco Asturiano’s <a href="https://globe.gl/" target="_blank">Globe.GL</a> package, a convenience wrapper for ThreeJS. The globe's contour map is derived from a 1993 <a href="https://astrogeology.usgs.gov/search/map/Venus/Magellan/RadarProperties/Venus_Magellan_Topography_Global_4641m_v02" target="_blank">topographic elevation map</a> captured by NASA's Magellan team. The map was taken into <a href="https://www.qgis.org/en/site/" target="_blank">QGIS</a> to generate contours, exported as an SVG file, and styled using Adobe Illustrator.</p>

<p class='about-data-paragraph'>This project is a capstone for the CUNY Graduate Center’s <a href="https://www.gc.cuny.edu/data-analysis-and-visualization/curriculum-and-degree-information" target="_blank">M.S. in Data Analysis & Visualization</a> program for fall 2022.  It was inspired by the works of <a href="https://tabletopwhale.com/2017/03/06/goddesses-of-venus.html" target="_blank">Eleanor Lutz</a>, <a href="https://bookshop.org/p/books/encyclopedia-of-goddesses-heroines-revised-patricia-monaghan/107143" target="_blank">Patricia Monaghan</a>, <a href="https://wenamethestars.inkleby.com/world/venus" target="_blank">Inkleby</a>, and <a href="https://hargitaihenrik.wordpress.com/" target="_blank">Henrik Hargitai</a>.</p>

<p class='about-data-paragraph'>Special thanks to Aucher Serr, Matthew Gold, Jason Nieslen, and my colleagues at Axios Visuals for their support. And to Leighton, who made me so many cups of tea.</p>