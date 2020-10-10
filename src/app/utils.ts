import { NgModule, Inject, PLATFORM_ID } from '@angular/core';
import { NgForm } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { InjectorInstance } from './helpers/injection.module';
import * as moment from 'moment';
declare const $: any;
declare const mApp: any;


@NgModule()
export class Utils {
    /**
     * Changing navigation from main to dashboard
     */
    public static switchNavbarToDashboard() {
        const platformId = InjectorInstance.get(PLATFORM_ID as any);
        if (isPlatformBrowser(platformId)) {
            $('#footer').hide();
            $('#header-container').addClass('dashboard-header');
            Utils.initNavbar();
        }
    }

    /**
     * Changing navigation from dashboard to main
     */
    public static switchNavbarToMain() {
        const platformId = InjectorInstance.get(PLATFORM_ID as any);
        if (isPlatformBrowser(platformId)) {
            $('#footer').show();
            $('#header-container').removeClass('dashboard-header');
            Utils.initNavbar();
        }
    }

    /**
     * Show error messages whenever occured.
     * @todo use a plugin to toast error notifications.
     * @param text string
     * @param error obj
     */
    public static showErrorMessage(text, error) {
        console.log(error);
    }

    /**
     * Show loader on an element
     * @param element element selector e.g. #div-id
     */
    public static showLoader(element) {
        const platformId = InjectorInstance.get(PLATFORM_ID as any);
        if (isPlatformBrowser(platformId)) {
            mApp.showLoader(element);
        }
    }

    /**
     * Hide loader on an element
     * @param element element selector e.g. #div-id
     */
    public static hideLoader(element) {
        const platformId = InjectorInstance.get(PLATFORM_ID as any);
        if (isPlatformBrowser(platformId)) {
            mApp.hideLoader(element);
        }
    }

    /**
     * Show loader on entire page
     */
    public static blockPage() {
        const platformId = InjectorInstance.get(PLATFORM_ID as any);
        if (isPlatformBrowser(platformId)) {
            mApp.blockPage();
        }
    }

    /**
     * Hide loader from the page
     */
    public static unblockPage() {
        const platformId = InjectorInstance.get(PLATFORM_ID as any);
        if (isPlatformBrowser(platformId)) {
            mApp.unblockPage();
        }
    }

    /**
     * Generate a globally unique ID.
     */
    public static guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    /**
     * Sets error in a template driven form
     * @param errors errors from the server
     * @param form form instance
     */
    public static setErrorsInForm(errors: any, form: NgForm) {
        for (const error in errors) {
            if (errors.hasOwnProperty(error)) {
                if (form.controls[error]) {
                    form.controls[error].setErrors({ server: errors[error] });
                }
            }
        }
    }

    /**
     * Showing a magnigic popup
     * @param target e.g. #login-modal
     */
    public static showMagnificPopup(target) {
        const platformId = InjectorInstance.get(PLATFORM_ID as any);
        if (isPlatformBrowser(platformId)) {
            $.magnificPopup.open({
                items: {
                    src: target
                },
                type: 'inline',
                fixedContentPos: false,
                fixedBgPos: true,
                overflowY: 'auto',
                closeBtnInside: true,
                preloader: false,
                removalDelay: 300,
                mainClass: 'my-mfp-zoom-in'
            }, 0);
        }
    }


    /**
     * Hiding a magnigic popup
     * @param target e.g. #login-modal
     */
    public static hideMagnigicPopup(target) {
        const platformId = InjectorInstance.get(PLATFORM_ID as any);
        if (isPlatformBrowser(platformId)) {
            $(target).magnificPopup('close');
        }
    }

    /**
     * Initializing mega menu, dropdowns and popups in navbar
     */
    public static initNavbar() {
        const platformId = InjectorInstance.get(PLATFORM_ID as any);
        if (isPlatformBrowser(platformId)) {
            mApp.initNavbar();
        }
    }

    /**
     * Initialize slider
     * @param target element
     */
    public static initializeSlider(target) {
        const platformId = InjectorInstance.get(PLATFORM_ID as any);
        if (isPlatformBrowser(platformId)) {
            const mySlider = $(target).slider();
            return mySlider;
        }
    }

    /**
     * Initialze tabs
     */
    public static initTabs() {
        const platformId = InjectorInstance.get(PLATFORM_ID as any);
        if (isPlatformBrowser(platformId)) {
            mApp.initTabs();
        }
    }

    /**
     * Initialize keywords input
     */
    public static initKeywords() {
        const platformId = InjectorInstance.get(PLATFORM_ID as any);
        if (isPlatformBrowser(platformId)) {
            mApp.initKeywords();
        }
    }

    /**
     * Get value from keyword input
     * @param target e.g. .keyword-input
     */
    public static getKeywords(target) {
        const platformId = InjectorInstance.get(PLATFORM_ID as any);
        if (isPlatformBrowser(platformId)) {
            return mApp.getKeywords(target);
        }
    }

    /**
     * Initialize background image.
     */
    public static initBackground() {
        const platformId = InjectorInstance.get(PLATFORM_ID as any);
        if (isPlatformBrowser(platformId)) {
            mApp.inlineBG();
        }
    }

    public static scrollToBottom(target) {
        $(target).animate({
            scrollTop: $(target).get(0).scrollHeight
        }, 100);
    }

    /**
     * Converts PHP format to date
     * @param string date format
     */
    public static toDate(date) {
        return moment(date).toDate();
    }

    public static initialzeAccordion() {
        const platformId = InjectorInstance.get(PLATFORM_ID as any);
        if (isPlatformBrowser(platformId)) {
            mApp.initAccordion();
        }
    }
}
