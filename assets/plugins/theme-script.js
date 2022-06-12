$(document).ready(function () {
	let banner = new Swiper('.banner-area .swiper-container', {
		slidesPerView: 1.2,
		spaceBetween: 10,
		loop: true,
		autoplay: {
			delay: 10000,
			disableOnInteraction: false,
		}
	});
	
	$('#actionSocial > a, #closeSocial').click(function () {
		let parent = $(this).closest('#actionSocial');
		
		if (parent.hasClass('active')) {
			parent.removeClass('active');
		} else {
			parent.addClass('active');
		}
	});
	
	if ($('.select2').length) {
		$('.select2').select2();
	}

//	Chat
//	Resize Textarea chat
	$('.inputAutoResize').each(function () {
		let elm = $(this);
		elm.on('input', function () {
			elm.css("height", "auto");
			elm.css("height", elm[0].scrollHeight + 'px');
		});
	});

//	Call modal user
	let zIndex = 0;
	
	function callModal(elm) {
		zIndex++;
		if (elm.hasClass('modalShow')) {
			elm.removeClass('modalShow');
			setTimeout(function () {
				elm.css('z-index', "");
			}, 300);
		} else {
			elm.addClass('modalShow').css('z-index', zIndex);
		}
		
		if ($('.modalMain.modalShow').length === 0) {
			zIndex = 0;
		}
	}
	
	$('.closeModalBnails').click(function (e) {
		callModal($(this).closest('.modalMain'));
	});
	
	$('.actionChat').click(function () {
		callModal($('.modalUser'));
	});
	
	$('.userItem').click(function () {
		callModal($('.modalChat'));
	});
	
	$('.callStatus').click(function () {
		callModal($('.modalStatus'));
	});

//	Script Newfeed
	$('.actionLike').click(function () {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).find('i').removeClass('fas').addClass('fal');
		} else {
			$(this).addClass('active');
			$(this).find('i').removeClass('fal').addClass('fas');
		}
	})
	
	$('.viewReadmore').click(function () {
		let innerElm = $(this).parent().prev();
		innerElm.css('max-height', '100%');
		$(this).remove();
	});
	
	$('.callBg').click(function () {
		$('.modalStatus-body--bg').show();
	});
	
	$('.changeBg').click(function () {
		let linkBG = $(this).data('bg');
		$(this).parents('#listBg').find('li').removeClass('active');
		$(this).parent().addClass('active');
		$('.modalStatus-body--text').addClass('activeBg').css('background-image', 'url("' + linkBG + '")');
		closeImage();
	})
	
	$('.removeBg').click(function () {
		removeBg();
	})

//	Upload Multiple Image
	$('#getImage').on('change', function () {
		imagesPreview(this);
	});
	
	function imagesPreview(file) {
		if (file.files) {
			let classImage = "";
			let html = "";
			let lengthFile = file.files.length;
			
			if (lengthFile == 2) {
				classImage = "image-two";
			} else if (lengthFile == 3) {
				classImage = "image-three";
			} else if (lengthFile == 4) {
				classImage = "image-four";
			} else if (lengthFile > 4) {
				classImage = "image-five";
			}
			
			$('.modalStatus-body--text .image-inner').addClass(classImage);
			
			for (let i = 0; i < lengthFile; i++) {
				let reader = new FileReader();
				if (i < 5) {
					let removeImage = '';
					if (i != 4) {
						removeImage = `<a href="javascript:void(0)" class="removeImage">
									<i class="fas fa-times"></i>
								</a>`;
					}
					reader.onload = function (e) {
						html += `<div class="image-item" style="background-image: url('${e.target.result}')">
								${removeImage}
							</div>`;
						$('.modalStatus-body--text').addClass('activeImg');
						$('.modalStatus-body--text .image-inner').html(html);
					}
				}
				reader.readAsDataURL(file.files[i]);
				
				removeBg();
			}
			
		}
	}
	
	$(document).on("click", ".removeImage", function () {
		$(this).parent().remove();
	})
	
	
	function removeBg() {
		$('.modalStatus-body--bg').hide();
		$('#listBg li').removeClass('active');
		$('.modalStatus-body--text').removeClass('activeBg').css('background-image', 'url()');
	}
	
	function closeImage() {
		$('.modalStatus-body--text').removeClass('activeImg');
		$('.modalStatus-body--text .image-inner').html('');
	}
	
	// Refresh textarea
	$('#refreshForm').click(function () {
		$('.textareaRefresh').val('');
	})

	function customSelect() {
		if ($('.js-custom_select').length) {
			$(".js-custom_select").each(function (i, item) {
				let selector = $(item).children('span');
				selector.click(function () {
					if ($(item).hasClass('is-focus')) {
						$(item).removeClass('is-focus');
					} else {
						$(item).addClass('is-focus');
					}
				});

				let optionSelector = $(item).children('ul').find('li > a');
				/*optionSelector.click(function () {
					if (!$(this).hasClass('active')) {
						optionSelector.removeClass('active');
						$(this).addClass('active');
						selector.html($(this).find('.text').html());
					}
					$(item).removeClass('is-focus');
				});*/
				$(item).on('click', 'li > a', function () {
					if (!$(this).hasClass('active')) {
						optionSelector.removeClass('active');
						$(this).addClass('active');
						selector.html($(this).find('.text').html());
					}
					$(item).removeClass('is-focus');
				});
			});

			$(document).on("mouseup", function (e) {
				let o = $(".js-custom_select.is-focus");
				o.is(e.target) || 0 !== o.has(e.target).length || (
					$(".js-custom_select.is-focus").removeClass('is-focus')
				)
			});
		}
	}

	customSelect();
});
