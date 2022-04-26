// JavaScript Document
//equal height
$(document).ready(function() {
    if ($(".same_height").length > 0) {
        $(".same_height").matchHeight();
    }
});
//select
$(document).ready(function() {
    $("select").select2({
        minimumResultsForSearch: -1
    });
});
//mobile menu
$('.menu_btn').click(function(e) {
    e.stopPropagation();
    $('body').addClass('fixed');
    $('.left-side').addClass('show-menu');
});
$(".left-side").click(function(e) {
    e.stopPropagation();
});
$('body').click(function() {
    $('body').removeClass('fixed');
    $('.left-side').removeClass('show-menu');
});
//menu
$(function() {
    var Accordion = function(el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;
        // Variables privadas
        var links = this.el.find('.link');
        // Evento
        links.on('click', {
            el: this.el,
            multiple: this.multiple
        }, this.dropdown)
    }
    Accordion.prototype.dropdown = function(e) {
        var $el = e.data.el;
        $this = $(this),
        $next = $this.next();
        $next.slideToggle();
        $this.parent().toggleClass('open');
        if (!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
        };
    }
    var accordion = new Accordion($('.left-side ul'), false);
});
$(".left-side ul").find('li ul').parent().find('.link').prepend('<i class="fa fa-angle-down">' + '</i>');
$(".left-side ul").find('li ul').parent().find('.link').removeAttr("href");
//login 
$('#member_username').click(function() {
    $('.with-errors').html('');
});
$('#member_password').click(function() {
    $('.with-errors').html('');
});
//tooltip
function myTooltip() {
    if ($(window).width() < 1025) {
        $('.ul_hover li span').attr('data-placement', 'top');
        $('.ul_hover li span').tooltip();
    } else {
        $('.ul_hover li span').attr('data-placement', 'right');
        $('.ul_hover li span').tooltip();
    }
}
$(document).ready(function() {
    myTooltip();
});
$(window).resize(function() {
    myTooltip();
});
//img preview
$("#frontimg").on('change', function() {
    if (typeof(FileReader) != "undefined") {
        var image_holder = $("#image-holder");
        image_holder.empty();
        var reader = new FileReader();
        reader.onload = function(e) {
            $("<img />", {
                "src": e.target.result,
                "class": "thumb-image"
            }).appendTo(image_holder);
        }
        image_holder.show();
        reader.readAsDataURL($(this)[0].files[0]);
    } else {
        alert("This browser does not support FileReader.");
    }
});
//img preview  
$("#backimg").on('change', function() {
    if (typeof(FileReader) != "undefined") {
        var image_holder = $("#backimage-holder");
        image_holder.empty();
        var reader = new FileReader();
        reader.onload = function(e) {
            $("<img />", {
                "src": e.target.result,
                "class": "thumb-image"
            }).appendTo(image_holder);
        }
        image_holder.show();
        reader.readAsDataURL($(this)[0].files[0]);
    } else {
        alert("This browser does not support FileReader.");
    }
});
$('.vone').click(function() {
    $('.front-img').show();
    $('.back-img').hide();
});
$('.vtwo').click(function() {
    $('.front-img').hide();
    $('.back-img').show();
});
//placeholder
$(document).ready(function() {
    $('input,textarea').focus(function() {
        $(this).data('placeholder', $(this).attr('placeholder')).attr('placeholder', '');
    }).blur(function() {
        $(this).attr('placeholder', $(this).data('placeholder'));
    });
});
// question
$(document).ready(function() {
    jQuery('#member_security_question_id1').on('change', function() {
        var curval = jQuery(this).val();
        jQuery('#member_security_question_id2 option').attr("disabled", false);
        jQuery('#member_security_question_id2 option[value=' + curval + ']').attr("disabled", true);
        jQuery('#member_security_question_id2').select2({
            minimumResultsForSearch: -1
        });
    });
    jQuery('#member_security_question_id2').on('change', function() {
        var curval = jQuery(this).val();
        jQuery('#member_security_question_id1 option').attr("disabled", false);
        jQuery('#member_security_question_id1 option[value=' + curval + ']').attr("disabled", true);
        jQuery('#member_security_question_id1').select2({
            minimumResultsForSearch: -1
        });
    });
    // ============================================== //
    jQuery.validator.addMethod("checkTotal", function(value) {
        total = parseFloat($('#member_paycheck_checking_split').val()) + parseFloat($('#member_paycheck_savings_split').val());
        return total == 100;
    }, "Total must add up to 100%!");
    jQuery("#member_form").validate({
        rules: {
            member_paycheck_checking_split: {
                required: true,
                number: true,
                checkTotal: true
            },
            member_paycheck_savings_split: {
                required: true,
                number: true,
                checkTotal: true
            },
            member_money_receive1: {
                require_from_group: [1, ".money-receive-group"]
            },
            member_money_receive2: {
                require_from_group: [1, ".money-receive-group"]
            },
            member_money_receive3: {
                require_from_group: [1, ".money-receive-group"]
            }
        },
        groups: {
            percent: "member_paycheck_checking_split member_paycheck_savings_split",
            moneyreceive: "member_money_receive1 member_money_receive2 member_money_receive3"
        },
        errorPlacement: function(error, element) {
            if (element.attr("name") == "member_paycheck_checking_split" || element.attr("name") == "member_paycheck_savings_split") {
                error.insertAfter("#member_paycheck_savings_split");
            } else if (element.attr("name") == "member_money_receive1" || element.attr("name") == "member_money_receive2" || element.attr("name") == "member_money_receive3") {
                error.appendTo("#errordisplay");
            } else if (element.attr("name") == "member_allowance_receive_type") {
                error.appendTo("#errordisplay1");
            } else if (element.attr("name") == "member_family_gift_receive_type") {
                error.appendTo("#errordisplay2");
            } else if (element.attr("name") == "member_job_receive_type") {
                error.appendTo("#errordisplay3");
            } else if (element.attr("name") == "member_allowance_cash_receive_type") {
                error.appendTo("#errordisplay4");
            } else if (element.attr("name") == "member_family_gift_cash_receive_type") {
                error.appendTo("#errordisplay5");
            } else if (element.attr("name") == "member_job_cash_receive_type") {
                error.appendTo("#errordisplay6");
            } else {
                error.insertAfter(element);
            }
        }
    });
    jQuery('#member_below_alert_0').on('ifChecked', function(event) {
        jQuery('#member_below_alert_id_0').val('checked');
        jQuery('#member_below_alert_text_0').removeAttr('disabled');
        jQuery('#member_below_alert_text_0').attr('data-rule-required', 'true');
    });
    jQuery('#member_below_alert_0').on('ifUnchecked', function(event) {
        jQuery('#member_below_alert_id_0').val('unchecked');
        jQuery('#member_below_alert_text_0').attr('disabled', 'true');
        jQuery('#member_below_alert_text_0').removeAttr('data-rule-required');
    });
    jQuery('#member_below_alert_1').on('ifChecked', function(event) {
        jQuery('#member_below_alert_id_1').val('checked');
        jQuery('#member_below_alert_text_1').removeAttr('disabled');
        jQuery('#member_below_alert_text_1').attr('data-rule-required', 'true');
    });
    jQuery('#member_below_alert_1').on('ifUnchecked', function(event) {
        jQuery('#member_below_alert_id_1').val('unchecked');
        jQuery('#member_below_alert_text_1').attr('disabled', 'true');
        jQuery('#member_below_alert_text_1').removeAttr('data-rule-required');
    });
    jQuery('#member_below_alert_2').on('ifChecked', function(event) {
        jQuery('#member_below_alert_id_2').val('checked');
        jQuery('#member_below_alert_text_2').removeAttr('disabled');
        jQuery('#member_below_alert_text_2').attr('data-rule-required', 'true');
    });
    jQuery('#member_below_alert_2').on('ifUnchecked', function(event) {
        jQuery('#member_below_alert_id_2').val('unchecked');
        jQuery('#member_below_alert_text_2').attr('disabled', 'true');
        jQuery('#member_below_alert_text_2').removeAttr('data-rule-required');
    });
    jQuery('#member_below_alert_3').on('ifChecked', function(event) {
        jQuery('#member_below_alert_id_3').val('checked');
        jQuery('#member_below_alert_text_3').removeAttr('disabled');
        jQuery('#member_below_alert_text_3').attr('data-rule-required', 'true');
    });
    jQuery('#member_below_alert_3').on('ifUnchecked', function(event) {
        jQuery('#member_below_alert_id_3').val('unchecked');
        jQuery('#member_below_alert_text_3').attr('disabled', 'true');
        jQuery('#member_below_alert_text_3').removeAttr('data-rule-required');
    });
    jQuery('#member_below_alert_4').on('ifChecked', function(event) {
        jQuery('#member_below_alert_id_4').val('checked');
        jQuery('#member_below_alert_text_4').removeAttr('disabled');
        jQuery('#member_below_alert_text_4').attr('data-rule-required', 'true');
    });
    jQuery('#member_below_alert_4').on('ifUnchecked', function(event) {
        jQuery('#member_below_alert_id_4').val('unchecked');
        jQuery('#member_below_alert_text_4').attr('disabled', 'true');
        jQuery('#member_below_alert_text_4').removeAttr('data-rule-required');
    });
    jQuery('#member_below_alert_5').on('ifChecked', function(event) {
        jQuery('#member_below_alert_id_5').val('checked');
        jQuery('#member_below_alert_text_5').removeAttr('disabled');
        jQuery('#member_below_alert_text_5').attr('data-rule-required', 'true');
    });
    jQuery('#member_below_alert_5').on('ifUnchecked', function(event) {
        jQuery('#member_below_alert_id_5').val('unchecked');
        jQuery('#member_below_alert_text_5').attr('disabled', 'true');
        jQuery('#member_below_alert_text_5').removeAttr('data-rule-required');
    });
    // ============================================== //
    jQuery('.choosePopup-btn').click(function() {
        var hrefval = jQuery(this).attr('data-href');
        var dataval = jQuery(this).attr('data-val');
        jQuery('#choosePopup .hideblock').removeClass('show');
        jQuery('#' + dataval + '').addClass('show');
        //alert(hrefval);
        jQuery('#choosePopup').modal().on('shown.bs.modal', function() {
            jQuery('#account_type_savings').attr("onclick", "window.location='" + hrefval + "?acctype=Savings'");
            jQuery('#account_type_checking').attr("onclick", "window.location='" + hrefval + "?acctype=Checking'");
        });
        return false;
    });
    $("#change-date-trigger").on("click", function() {
        $("#masker").fadeIn();
        $("#arrow-pointer").stop().css('left', -35).animate({
            opacity: 1,
            left: '-=10'
        }, function() {
            $("#arrow-pointer").animate({
                left: '+=10'
            }, function() {
                $("#arrow-pointer").animate({
                    left: '-=10'
                }, function() {
                    $("#arrow-pointer").animate({
                        left: '+=10',
                    }, function() {
                        $("#arrow-pointer").animate({
                            opacity: 0,
                        }, 200);
                        $("#masker").fadeOut();
                    });
                });
            });
        });
    });
    // ============================================== //
});

function userquesBlock() {
    //alert(jQuery('#member_username1').val());
    if (jQuery('#member_username1').val() != '') {
        $.ajax({
            type: "get",
            url: "ajax/get_security_question.php",
            data: 'member_username=' + jQuery('#member_username1').val(),
            success: function(data) {
                jQuery('.loader').hide();
                $("#userquesBlock").html(data);
                jQuery("#userquesBlock").slideDown();
            }
        });
    } else {
        jQuery("#userquesBlock").slideUp();
    }
}

function payee_edit() {
    alert('hhs');
}

function moneySource(id) {
    console.log(id);
    if (jQuery('#' + id + '').is(':checked')) {
        jQuery('#' + id + '_method_wrap').slideDown();
    } else {
        jQuery('#' + id + '_method_wrap').slideUp();
    }
}

function moneyType(value, name) {
    console.log(value);
    console.log(name);
    console.log('#' + name + '_' + value + '_wrap');
    if (value == 'cash') {
        jQuery('#' + name + '_wrapinner').slideDown();
        //alert('cash');
    } else {
        jQuery('#' + name + '_wrapinner').slideUp();
        //alert('no-cash');
    }
}

function alertType(id) {
    console.log(id);
    if (jQuery('#' + id + '').is(':checked')) {
        jQuery('#' + id + '_text').attr({
            "readonly": false,
            "required": true
        });
    } else {
        jQuery('#' + id + '_text').attr({
            "readonly": true,
            "required": false
        });
    }
}