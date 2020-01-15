//credentials 
//access key : 2f33b54db37d333ddc97e09ace3cf2a0324db5a0109ee47b3bb2259d31de8246
//secret : 1edfbc111ac15e062c7df13573a8ceb4746070cc4cde1ff887cdfb449409162e
const $ = require('jquery')
const Unsplash = require('unsplash-js').default;
require('es6-promise').polyfill();
require('isomorphic-fetch');
const toJson = require('unsplash-js').toJson

const unsplash = new Unsplash({
  applicationId: "2f33b54db37d333ddc97e09ace3cf2a0324db5a0109ee47b3bb2259d31de8246",
  secret: "1edfbc111ac15e062c7df13573a8ceb4746070cc4cde1ff887cdfb449409162e"
});

unsplash.search.photos("faces", 1)
  .then(toJson)
  .then(json => {
      console.log(json)
    // Your code
  });
//query to get more realistic images : dead woman crime scene photos
 
//build crime scene photos table:
//bring incident ids , loop over all , get crime scene photos from api limit 10 , create object:
//{ incident_id,crime_scene_photos:[]}

//build crime scene videos :
//bring incident ids , loop over all , get crime scene videos from api limit 10 , create object:
//{ incident_id,crime_scene_videos:[]}

function getImages(keywords,per_page,page){
  //https://pixabay.com/api/docs/
  var API_KEY = '12996986-d585cf29b5985e0517dc33952';
  page = page?page:1
  per_page = per_page?per_page:10
  let pics = []
  var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(keywords)+"&page="+page+"&per_page="+per_page
  $.getJSON(URL, function(data){
  if (parseInt(data.totalHits) > 0)
      $.each(data.hits, function(i, hit){ 
        pics.push(hit)
      });
  else
      console.log('No hits');
  });
  return pics
}