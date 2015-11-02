/**
 * @file
 * Custom JS for enabling/disabling the CodeMirror interface.
 */

(function ($) {
  Drupal.behaviors.field_cssCodeMirror = {

    attach: function(context, settings) {
      // Append enable/disable links.
      $('.field-type-field-css-field .form-textarea-wrapper', context).each(function() {
        $(this).after(' <a href="#" class="field_css-toggle">Enable syntax highlighting</a>.');
          var $textarea = $(this).parents('.form-type-textarea').find('textarea');
      });

      // Toggle syntax highlighting.
      $('.field_css-toggle', context).click(function() {
        var $textarea = $(this).parents('.form-type-textarea').find('textarea');
        var $textareawrapper = $(this).parents('.form-type-textarea').find('form-textarea-wrapper');
        var $grippie = $textarea.parents('.resizable-textarea').find('.grippie');
        var type = $textarea.attr('id').replace('edit-field_css-', '');
        var mode = 'css';
        $textareawrapper.addClass("nowrapping");

        // Enable.
        if (!$(this).hasClass('enabled')) {
          //$textarea.val("{\n" + $textarea.val() + "\n}");
          $grippie.hide();
          var editor = CodeMirror.fromTextArea($textarea.get(0), {
            mode: mode,
            tabSize: 0,
            gutters: ['CodeMirror-linenumbers'],
            lineNumbers: true
          });
          $(this).data('editor', editor);
          $(this).text(Drupal.t('Disable syntax highlighting')).addClass('enabled');
        }

        // Disable.
        else {
          $(this).data('editor').toTextArea();
          $grippie.show();
          $(this).text(Drupal.t('Enable syntax highlighting')).removeClass('enabled');
          //$textarea.val($textarea.val().replace("\n}", "").replace("{\n",""));
        }
        return false;
      });
    }

  };
})(jQuery);
