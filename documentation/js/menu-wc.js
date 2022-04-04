'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">frontend-web-server-tmf639 documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-71d7481321459157b8fae42349cadc47f8b438c6c55e52116dfd62cc4fd418445944049ce057977f0460c2364ce5bceb5bf32f71b3a359d75025b72942ce035e"' : 'data-target="#xs-components-links-module-AppModule-71d7481321459157b8fae42349cadc47f8b438c6c55e52116dfd62cc4fd418445944049ce057977f0460c2364ce5bceb5bf32f71b3a359d75025b72942ce035e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-71d7481321459157b8fae42349cadc47f8b438c6c55e52116dfd62cc4fd418445944049ce057977f0460c2364ce5bceb5bf32f71b3a359d75025b72942ce035e"' :
                                            'id="xs-components-links-module-AppModule-71d7481321459157b8fae42349cadc47f8b438c6c55e52116dfd62cc4fd418445944049ce057977f0460c2364ce5bceb5bf32f71b3a359d75025b72942ce035e"' }>
                                            <li class="link">
                                                <a href="components/AccountComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateResourceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateResourceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MapPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MapPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalDeleteResourceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalDeleteResourceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalSingleResourcesActionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalSingleResourcesActionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalSingleResourcesParametersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalSingleResourcesParametersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalSingleResourcesValuesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalSingleResourcesValuesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PagenotfoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PagenotfoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResourceItemBlockComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResourceItemBlockComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResourceItemListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResourceItemListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResourcesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResourcesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResourcesFilterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResourcesFilterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResourcesViewBlockComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResourcesViewBlockComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResourcesViewListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResourcesViewListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SingleResourcesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SingleResourcesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdminGuardService.html" data-type="entity-link" >AdminGuardService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AdminService.html" data-type="entity-link" >AdminService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AlertifyService.html" data-type="entity-link" >AlertifyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthGuardService.html" data-type="entity-link" >AuthGuardService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResourceService.html" data-type="entity-link" >ResourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UiService.html" data-type="entity-link" >UiService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/HttpRequestInterceptor.html" data-type="entity-link" >HttpRequestInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Any.html" data-type="entity-link" >Any</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AttachmentRefOrValue.html" data-type="entity-link" >AttachmentRefOrValue</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Characteristic.html" data-type="entity-link" >Characteristic</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CharacteristicRelationship.html" data-type="entity-link" >CharacteristicRelationship</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConstraintRef.html" data-type="entity-link" >ConstraintRef</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventSubscription.html" data-type="entity-link" >EventSubscription</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventSubscriptionInput.html" data-type="entity-link" >EventSubscriptionInput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Feature.html" data-type="entity-link" >Feature</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FeatureRelationship.html" data-type="entity-link" >FeatureRelationship</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/loginResponse.html" data-type="entity-link" >loginResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/logoutResponse.html" data-type="entity-link" >logoutResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Note.html" data-type="entity-link" >Note</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Quantity.html" data-type="entity-link" >Quantity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RelatedParty.html" data-type="entity-link" >RelatedParty</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RelatedPlaceRefOrValue.html" data-type="entity-link" >RelatedPlaceRefOrValue</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Resource.html" data-type="entity-link" >Resource</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResourceCreate.html" data-type="entity-link" >ResourceCreate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResourceRelationship.html" data-type="entity-link" >ResourceRelationship</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResourceSpecificationRef.html" data-type="entity-link" >ResourceSpecificationRef</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResourceUpdate.html" data-type="entity-link" >ResourceUpdate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/signupResponse.html" data-type="entity-link" >signupResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TimePeriod.html" data-type="entity-link" >TimePeriod</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});