import $ from '../../bundles/node_modules/jquery';

// NAVBAR ACTIVE LINK
$('.nav-items a').each(function() {
    var isActive = this.pathname === location.pathname;
    $(this).children(0).toggleClass('active', isActive);
});
