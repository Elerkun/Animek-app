function bodyIndex() {
  $('body').css({ background: '#5C728A' })
}
function bodyPages() {
  $('body').css({
    'background-color': ' #d3d5d2 ',
    'background-size': 'cover',
    'background-position': 'center'
  })
  $('.foot').css({ position: 'position-relative' })
  $('body').fadeIn('slow')
}
function addFav() {
  $('.addFav').prop('disabled', true)
  $('.delFav').prop('disabled', false)
  $('.delFav').css({ cursor: 'ponteir' })
}
function delFav() {
  $('.delFav').prop('disabled', true)
  $('.addFav').prop('disabled', false)
  $('.addFav').css({ cursor: 'ponteir' })
}
function slider(anime) {
  if (anime) {
    $('#recipeCarousel').carousel({
      interval: 2000
    })

    $('.carousel .carousel-item').each(function () {
      var next = $(this).next()
      if (!next.length) {
        next = $(this).siblings(':first')
      }
      next.children(':first-child').clone().appendTo($(this))

      for (var i = 0; i < 2; i++) {
        next = next.next()
        if (!next.length) {
          next = $(this).siblings(':first')
        }

        next.children(':first-child').clone().appendTo($(this))
      }
    })
  }
}
