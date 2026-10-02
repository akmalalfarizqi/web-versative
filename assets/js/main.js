/* Versative Digital Solutions - interaksi halaman */
(function () {
    'use strict';

    /* ---- Tutup menu mobile setelah link diklik ---- */
    var nav = document.getElementById('mainNav');
    if (nav) {
        nav.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                if (nav.classList.contains('show')) {
                    bootstrap.Collapse.getOrCreateInstance(nav).hide();
                }
            });
        });
    }

    /* ---- Form kontak: validasi lalu buka WhatsApp ---- */
    var form = document.getElementById('contactForm');
    if (!form) return;

    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function check(field) {
        var value = field.value.trim();
        var ok = value !== '' && (field.type !== 'email' || emailRe.test(value));
        field.classList.toggle('is-invalid', !ok);
        return ok;
    }

    form.querySelectorAll('.form-control').forEach(function (field) {
        field.addEventListener('input', function () {
            if (field.classList.contains('is-invalid')) check(field);
        });
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        var fields = Array.prototype.slice.call(form.querySelectorAll('.form-control'));
        var valid = fields.map(check).every(Boolean);
        if (!valid) {
            var firstBad = form.querySelector('.is-invalid');
            if (firstBad) firstBad.focus();
            return;
        }

        var number = (form.dataset.waNumber || '').replace(/\D/g, '');
        var nama  = form.nama.value.trim();
        var email = form.email.value.trim();
        var pesan = form.pesan.value.trim();

        var text =
            'Halo Versative Digital Solutions,\n\n' +
            'Nama: ' + nama + '\n' +
            'Email: ' + email + '\n\n' +
            pesan;

        var url = 'https://wa.me/' + number + '?text=' + encodeURIComponent(text);
        window.open(url, '_blank', 'noopener');
    });
})();
