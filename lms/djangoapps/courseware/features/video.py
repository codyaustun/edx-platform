#pylint: disable=C0111

from lettuce import world, step
from lettuce.django import django_url
from common import i_am_registered_for_the_course, section_location

############### ACTIONS ####################


@step('when I view the video it has autoplay enabled')
def does_autoplay_video(_step):
    assert(world.css_find('.video')[0]['data-autoplay'] == 'True')


@step('when I view the videoalpha it has autoplay enabled')
def does_autoplay_videoalpha(_step):
    assert(world.css_find('.videoalpha')[0]['data-autoplay'] == 'True')


@step('the course has a Video component')
def view_video(_step):
    coursenum = 'test_course'
    i_am_registered_for_the_course(step, coursenum)

    # Make sure we have a video
    add_video_to_course(coursenum)
    chapter_name = world.scenario_dict['SECTION'].display_name.replace(" ", "_")
    section_name = chapter_name
    url = django_url('/courses/%s/%s/%s/courseware/%s/%s' %
                    (world.scenario_dict['COURSE'].org, world.scenario_dict['COURSE'].number, world.scenario_dict['COURSE'].display_name.replace(' ', '_'),
                        chapter_name, section_name,))
    world.browser.visit(url)


@step('the course has a VideoAlpha in (.*) mode component')
def view_videoalpha(step, player_mode):
    coursenum = 'test_course'
    i_am_registered_for_the_course(step, coursenum)

    # Make sure we have a videoalpha
    add_videoalpha_to_course(coursenum, player_mode.lower())
    chapter_name = world.scenario_dict['SECTION'].display_name.replace(" ", "_")
    section_name = chapter_name
    url = django_url('/courses/%s/%s/%s/courseware/%s/%s' %
                    (world.scenario_dict['COURSE'].org, world.scenario_dict['COURSE'].number, world.scenario_dict['COURSE'].display_name.replace(' ', '_'),
                        chapter_name, section_name,))
    world.browser.visit(url)


def add_video_to_course(course):
    world.ItemFactory.create(
        parent_location=section_location(course),
        category='video',
        display_name='Video',
    )


def add_videoalpha_to_course(course, player_mode):
    category = 'videoalpha'
    metadata = {
        'youtube_id_1_0':'',
        'youtube_id_0_75':'',
        'youtube_id_1_25':'',
        'youtube_id_1_5':'',
        'html5_sources':[
            'https://s3.amazonaws.com/edx-course-videos/edx-intro/edX-FA12-cware-1_100.mp4'
            'https://s3.amazonaws.com/edx-course-videos/edx-intro/edX-FA12-cware-1_100.webm'
            'https://s3.amazonaws.com/edx-course-videos/edx-intro/edX-FA12-cware-1_100.ogv'
        ],
    } if (player_mode is 'html5') \
    else {
        'youtube_id_1_0':'3O1_3zBUKM8',
        'youtube_id_0_75':'3O1_3zBUKM8',
        'youtube_id_1_25':'3O1_3zBUKM8',
        'youtube_id_1_5':'3O1_3zBUKM8',
    }
    world.ItemFactory.create(
        parent_location=section_location(course),
        category=category,
        display_name='Video Alpha',
        metadata=metadata
    )


@step('when I view the videoalpha it has rendered in HTML5 mode')
def does_videoalpha_rendered_in_html5_mode(_step):
    assert world.is_css_present('.videoalpha .video-player video')

@step('when I view the videoalpha it has rendered in Youtube mode')
def does_videoalpha_rendered_in_youtube_mode(_step):
    assert world.is_css_present('.videoalpha .video-player iframe')

