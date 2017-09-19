'use strict';
const STORE = {
  url: 'https://api.flickr.com/services/rest/',
  apiKey: '7ccd73941f6a1084b87f916f287880d6',
  userSearchTerm: '',
  searchResult: [],
  onPage: 1
};

function handleSearch(){
  $('.js-form').on('submit', function(event){
    event.preventDefault();
    STORE.searchResult = [];
    $('.js-search-result').html('');
    let search = $('.js-input').val();
    STORE.userSearchTerm = `${search} wallpaper`;
    $('.js-input').val('');
    getDataFromApi(STORE.userSearchTerm, displayData);
    $('.js-more-result-button').removeClass('hidden');
    $('.js-more-result-button').addClass('block');
  });
}

function getDataFromApi(searchTerm, callback){
  const request = {
    method: 'flickr.photos.search',
    api_key: STORE.apiKey,
    text: searchTerm,
    format: 'json',
    nojsoncallback: 1,
    per_page: 9,
    page: STORE.onPage
  };
  $.getJSON(STORE.url, request, callback);
}
function getInfoFromApi(searchTerm, callback){
  const request = {
    method: 'flickr.photos.search',
    api_key: STORE.apiKey,
    text: searchTerm,
    format: 'json',
    nojsoncallback: 1,
    per_page: 9,
    page: STORE.onPage
  };
  $.getJSON(STORE.url, request, callback);
}

function displayData(data){
  STORE.searchResult = data.photos.photo;
  renderimages(data.photos.photo);
  STORE.onPage++;
}

function displayInfo(response){
  $('.description').append(`
  <h2>${response.photo.title._content}</h2>
  <h4 class='download></h4>`);
}

function dislaySize(response){
  $('.description').find('.download').html(`
  <a href='${response.sizes.size[response.sizes.size.length-1].source} target='_blank'>Download Here</a>`;)
}

function renderimages(results){
  results.forEach(function(result){
    $('.js-search-result').append(`<div class='image-item col-4 box'>
      <img src='https://farm${result.farm}.staticflickr.com/${result.server}/${result.id}_${result.secret}.jpg' class='js-image img'>
      <div class='image-data>
      </div>
      </div>`);
  });

}

function pageRender(){
  $('.lightbox').addClass('hidden');
  $('.selected-image').addClass('hidden');
  $('.description').html('');
}

function eventHandlers(){
  handleSearch();

}
$(eventHandlers);