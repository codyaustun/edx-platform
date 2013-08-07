Feature: Video component
  As a student, I want to view course videos in LMS.

  Scenario: Videoalpha component is fully rendered in the LMS in HTML5 mode
  Given the course has a VideoAlpha in HTML5 mode component
  Then when I view the videoalpha it has rendered in HTML5 mode

  Scenario: Videoalpha component is fully rendered in the LMS in Youtube mode
  Given the course has a VideoAlpha in Youtube mode component
  Then when I view the videoalpha it has rendered in Youtube mode

  Scenario: Autoplay is enabled in LMS for a Video component
  Given the course has a Video component
  Then when I view the video it has autoplay enabled

  Scenario: Autoplay is enabled in the LMS for a VideoAlpha component
  Given the course has a VideoAlpha in Youtube mode component
  Then when I view the videoalpha it has autoplay enabled
