<template>
    <div class="wedding-root">
        <!-- Toast Feedback for Copy STK -->
        <Transition name="fade">
            <div v-if="toastMessage" class="wedding-toast">{{ toastMessage }}</div>
        </Transition>

        <!-- Floating Switcher (Chuyển đổi Nhà trai / Nhà gái & Xem thử tên khách mời) -->
        <div class="side-switcher-bar" role="navigation" aria-label="Chọn xem thiệp Nhà trai hoặc Nhà gái">
            <button type="button" class="side-btn" :class="{ active: currentSide === 'trai' }"
                @click="switchSide('trai')" title="Xem phiên bản tiệc cưới Nhà trai (?side=trai)">
                <span class="icon">🤵</span>
                <span class="label">Nhà trai</span>
            </button>
            <button type="button" class="side-btn" :class="{ active: currentSide === 'gai' }" @click="switchSide('gai')"
                title="Xem phiên bản tiệc cưới Nhà gái (?side=gai)">
                <span class="icon">👰</span>
                <span class="label">Nhà gái</span>
            </button>

            <div class="guest-switcher-wrap" title="Tên khách mời từ URL (?to=... hoặc ?guest=...)">
                <span class="guest-icon">✉️</span>
                <input type="text" :value="guestName" placeholder="Tên khách mời..." class="guest-quick-input"
                    @change="onGuestInputChange" />
            </div>
        </div>

        <div id="music-toggle" role="button" aria-label="Bật/tắt nhạc" title="Tắt nhạc" aria-pressed="true"
            class="playing">
            <!-- SOUND ON (waves) -->
            <svg id="icon-on" viewBox="0 0 24 24" fill="none" stroke="#2b2b2b" stroke-width="1.6" stroke-linecap="round"
                stroke-linejoin="round" style="display: block;">
                <polygon points="3 9 7 9 11 5 11 19 7 15 3 15"></polygon>
                <path d="M14 9.5a3 3 0 0 1 0 5"></path>
                <path d="M16.5 7a6 6 0 0 1 0 10"></path>
            </svg>
            <!-- SOUND OFF (muted) -->
            <svg id="icon-off" viewBox="0 0 24 24" fill="none" stroke="#2b2b2b" stroke-width="1.6"
                stroke-linecap="round" stroke-linejoin="round" style="display: none;">
                <polygon points="3 9 7 9 11 5 11 19 7 15 3 15"></polygon>
                <line x1="16" y1="8" x2="21" y2="13"></line>
                <line x1="21" y1="8" x2="16" y2="13"></line>
            </svg>
        </div>


        <div class="ladi-wraper">
            <div id="SECTION1" class="ladi-section">
                <div class="ladi-section-background"></div>
                <div class="ladi-container">
                    <div id="GROUP40" class="ladi-element">
                        <div class="ladi-group">
                            <div id="BOX1" class="ladi-element">
                                <div class="ladi-box ladi-transition"></div>
                            </div>
                            <div id="BOX2" class="ladi-element">
                                <div class="ladi-box ladi-transition"></div>
                            </div>
                            <div id="HEADLINE3" class="ladi-element ladi-animation">
                                <p class="ladi-headline ladi-transition">NGÀY CHUNG ĐÔI<br></p>
                            </div>
                            <div id="HEADLINE4" class="ladi-element ladi-animation">
                                <p class="ladi-headline ladi-transition" v-html="currentSideConfig.heroNames"></p>
                            </div>
                            <div id="HEADLINE5" class="ladi-element ladi-animation">
                                <p class="ladi-headline ladi-transition">{{ currentSideConfig.saveTheDateText }}<br></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="SECTION2" class="ladi-section">
                <div class="ladi-section-background"></div>
                <div class="ladi-container">
                    <div id="GROUP79" class="ladi-element">
                        <div class="ladi-group">
                            <div id="IMAGE2" class="ladi-element">
                                <div class="ladi-image">
                                    <div class="ladi-image-background"></div>
                                </div>
                            </div>
                            <div id="IMAGE4" class="ladi-element">
                                <div class="ladi-image ladi-transition">
                                    <div class="ladi-image-background"></div>
                                </div>
                            </div>
                            <div id="GROUP6" class="ladi-element ladi-animation-hidden">
                                <div class="ladi-group">
                                    <div id="IMAGE11" class="ladi-element">
                                        <div class="ladi-image">
                                            <div class="ladi-image-background"></div>
                                        </div>
                                    </div>
                                    <div id="HEADLINE7" class="ladi-element ladi-animation-hidden">
                                        <p class="ladi-headline ladi-transition" v-html="invitationLeadText"></p>
                                    </div>
                                    <div id="HEADLINE9" class="ladi-element ladi-animation-hidden">
                                        <p class="ladi-headline ladi-transition">{{ currentSideConfig.secondPersonName
                                        }}<br></p>
                                    </div>
                                    <div id="HEADLINE10" class="ladi-element ladi-animation-hidden">
                                        <p class="ladi-headline ladi-transition">&amp;<br></p>
                                    </div>
                                    <div id="HEADLINE11" class="ladi-element ladi-animation-hidden">
                                        <p class="ladi-headline ladi-transition">{{ currentSideConfig.countdownHeader ||
                                            'NGÀY TRỌNG ĐẠI SẼ DIỄN RA SAU' }}<br></p>
                                    </div>
                                    <div id="GROUP5" class="ladi-element">
                                        <div class="ladi-group">
                                            <div id="GROUP42" class="ladi-element">
                                                <div class="ladi-group">
                                                    <div id="COUNTDOWN2" class="ladi-element" data-type="endtime"
                                                        :data-endtime="new Date(currentSideConfig.event.date).getTime()"
                                                        data-date-start="0"
                                                        :data-date-end="new Date(currentSideConfig.event.date).getTime()"
                                                        data-end="true">
                                                        <div class="ladi-countdown">
                                                            <div id="COUNTDOWN_ITEM5" class="ladi-element"
                                                                data-item-type="day">
                                                                <div class="ladi-countdown-background"></div>
                                                                <div class="ladi-countdown-text"><span>{{ countdownDays
                                                                        }}</span></div>
                                                            </div>
                                                            <div id="COUNTDOWN_ITEM6" class="ladi-element"
                                                                data-item-type="hour">
                                                                <div class="ladi-countdown-background"></div>
                                                                <div class="ladi-countdown-text"><span>{{ countdownHours
                                                                        }}</span></div>
                                                            </div>
                                                            <div id="COUNTDOWN_ITEM7" class="ladi-element"
                                                                data-item-type="minute">
                                                                <div class="ladi-countdown-background"></div>
                                                                <div class="ladi-countdown-text"><span>{{
                                                                    countdownMinutes }}</span></div>
                                                            </div>
                                                            <div id="COUNTDOWN_ITEM8" class="ladi-element"
                                                                data-item-type="seconds">
                                                                <div class="ladi-countdown-background"></div>
                                                                <div class="ladi-countdown-text"><span>{{
                                                                    countdownSeconds }}</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="HEADLINE12" class="ladi-element">
                                                        <h3 class="ladi-headline ladi-transition">:<br></h3>
                                                    </div>
                                                    <div id="HEADLINE13" class="ladi-element">
                                                        <h3 class="ladi-headline ladi-transition">:<br></h3>
                                                    </div>
                                                    <div id="HEADLINE14" class="ladi-element">
                                                        <h3 class="ladi-headline ladi-transition">:<br></h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="HEADLINE15" class="ladi-element ladi-animation-hidden">
                                        <p class="ladi-headline ladi-transition">Ngày<br></p>
                                    </div>
                                    <div id="HEADLINE16" class="ladi-element ladi-animation-hidden">
                                        <p class="ladi-headline ladi-transition">Giờ<br></p>
                                    </div>
                                    <div id="HEADLINE17" class="ladi-element ladi-animation-hidden">
                                        <p class="ladi-headline ladi-transition">Phút<br></p>
                                    </div>
                                    <div id="HEADLINE18" class="ladi-element ladi-animation-hidden">
                                        <p class="ladi-headline ladi-transition">Giây<br></p>
                                    </div>
                                    <div id="HEADLINE8" class="ladi-element ladi-animation-hidden">
                                        <p class="ladi-headline ladi-transition">{{ currentSideConfig.firstPersonName
                                        }}<br></p>
                                    </div>
                                </div>
                            </div>
                            <div id="IMAGE13" class="ladi-element">
                                <div class="ladi-image">
                                    <div class="ladi-image-background"></div>
                                </div>
                            </div>
                            <div id="IMAGE8" class="ladi-element">
                                <div class="ladi-image ladi-transition">
                                    <div class="ladi-image-background"></div>
                                </div>
                            </div>
                            <div id="IMAGE14" class="ladi-element">
                                <div class="ladi-image">
                                    <div class="ladi-image-background"></div>
                                </div>
                            </div>
                            <div id="IMAGE15" class="ladi-element ladi-animation-hidden">
                                <div class="ladi-image">
                                    <div class="ladi-image-background"></div>
                                </div>
                            </div>
                            <div id="GROUP7" class="ladi-element ladi-animation-hidden">
                                <div class="ladi-group">
                                    <div id="IMAGE16" class="ladi-element">
                                        <div class="ladi-image">
                                            <div class="ladi-image-background"></div>
                                        </div>
                                    </div>
                                    <div id="BOX5" class="ladi-element">
                                        <div class="ladi-box"></div>
                                    </div>
                                </div>
                            </div>
                            <div id="IMAGE17" class="ladi-element ladi-animation-hidden">
                                <div class="ladi-image">
                                    <div class="ladi-image-background"></div>
                                </div>
                            </div>
                            <div id="IMAGE18" class="ladi-element ladi-animation-hidden">
                                <div class="ladi-image">
                                    <div class="ladi-image-background"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="SECTION3" class="ladi-section">
                <div class="ladi-section-background"></div>
                <div class="ladi-container">
                    <div id="BOX6" class="ladi-element">
                        <div class="ladi-box ladi-transition"></div>
                    </div>
                    <div id="BOX7" class="ladi-element">
                        <div class="ladi-box ladi-transition"></div>
                    </div>
                    <div id="HEADLINE19" class="ladi-element ladi-animation-hidden">
                        <p class="ladi-headline ladi-transition">Se duyên<br></p>
                    </div>
                    <div id="HEADLINE20" class="ladi-element ladi-animation-hidden">
                        <p class="ladi-headline ladi-transition">Chung đôi trọn đời<br></p>
                    </div>
                </div>
            </div>
            <div id="SECTION4" class="ladi-section">
                <div class="ladi-section-background"></div>
                <div class="ladi-container">
                    <div id="GROUP8" class="ladi-element">
                        <div class="ladi-group">
                            <div id="IMAGE22" class="ladi-element">
                                <div class="ladi-image">
                                    <div class="ladi-image-background"></div>
                                </div>
                            </div>
                            <div id="IMAGE19" class="ladi-element">
                                <div class="ladi-image">
                                    <div class="ladi-image-background"></div>
                                </div>
                            </div>
                            <div id="IMAGE21" class="ladi-element">
                                <div class="ladi-image">
                                    <div class="ladi-image-background"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="GROUP11" class="ladi-element ladi-animation-hidden">
                        <div class="ladi-group">
                            <div id="HEADLINE24" class="ladi-element">
                                <p class="ladi-headline ladi-transition">{{ currentSideConfig.firstFamily.title }}<br>
                                </p>
                            </div>
                            <div id="HEADLINE25" class="ladi-element">
                                <p class="ladi-headline ladi-transition">{{ currentSideConfig.firstFamily.father
                                    }}<br>{{ currentSideConfig.firstFamily.mother }}<br></p>
                            </div>
                        </div>
                    </div>
                    <div id="GROUP10" class="ladi-element ladi-animation-hidden">
                        <div class="ladi-group">
                            <div id="HEADLINE22" class="ladi-element">
                                <p class="ladi-headline ladi-transition">{{ currentSideConfig.secondFamily.title }}<br>
                                </p>
                            </div>
                            <div id="HEADLINE23" class="ladi-element">
                                <p class="ladi-headline ladi-transition">{{ currentSideConfig.secondFamily.father
                                    }}<br>{{ currentSideConfig.secondFamily.mother }}<br></p>
                            </div>
                        </div>
                    </div>
                    <div data-action="true" id="GROUP80" class="ladi-element ladi-animation-hidden">
                        <div class="ladi-group">
                            <div id="HEADLINE29" class="ladi-element ladi-animation-hidden">
                                <p class="ladi-headline ladi-transition" v-html="currentSideConfig.event.venueTitle.replace(/\n/g, '<br>')"></p>
                            </div>
                            <div id="HEADLINE30" class="ladi-element ladi-animation-hidden">
                                <p class="ladi-headline ladi-transition">{{ currentSideConfig.event.venueAddress }}</p>
                            </div><a :href="currentSideConfig.event.mapUrl" target="_blank" id="GROUP34"
                                class="ladi-element ladi-animation-hidden" :data-replace-href="currentSideConfig.event.mapUrl">
                                <div class="ladi-group">
                                    <div id="IMAGE47" class="ladi-element">
                                        <div class="ladi-image">
                                            <div class="ladi-image-background"></div>
                                        </div>
                                    </div>
                                    <div id="HEADLINE145" class="ladi-element">
                                        <p class="ladi-headline">chỉ đường<br></p>
                                    </div>
                                </div>
                            </a>
                            <div id="HEADLINE21" class="ladi-element ladi-animation-hidden">
                                <p class="ladi-headline ladi-transition">{{ currentSideConfig.partyLabel }}<br></p>
                            </div>
                            <div id="GROUP66" class="ladi-element">
                                <div class="ladi-group">
                                    <div id="HEADLINE26" class="ladi-element ladi-animation-hidden">
                                        <p class="ladi-headline ladi-transition">{{ currentSideConfig.secondPersonName
                                        }}<br></p>
                                    </div>
                                    <div id="HEADLINE27" class="ladi-element ladi-animation-hidden">
                                        <p class="ladi-headline ladi-transition">{{ currentSideConfig.firstPersonName }}
                                        </p>
                                    </div>
                                    <div id="HEADLINE28" class="ladi-element ladi-animation-hidden">
                                        <p class="ladi-headline ladi-transition">&amp;<br></p>
                                    </div>
                                </div>
                            </div>
                            <div id="HEADLINE32" class="ladi-element ladi-animation-hidden">
                                <p class="ladi-headline ladi-transition">Tổ chức tại</p>
                            </div>
                            <div id="GROUP14" class="ladi-element">
                                <div class="ladi-group">
                                    <div id="HEADLINE33" class="ladi-element ladi-animation-hidden">
                                        <p class="ladi-headline ladi-transition">{{ currentSideConfig.event.day }}</p>
                                    </div>
                                    <div id="GROUP15" class="ladi-element ladi-animation-hidden">
                                        <div class="ladi-group">
                                            <div id="LINE1" class="ladi-element">
                                                <div class="ladi-line">
                                                    <div class="ladi-line-container"></div>
                                                </div>
                                            </div>
                                            <div id="HEADLINE34" class="ladi-element">
                                                <p class="ladi-headline ladi-transition">{{
                                                    currentSideConfig.event.month }}<br></p>
                                            </div>
                                            <div id="LINE2" class="ladi-element">
                                                <div class="ladi-line">
                                                    <div class="ladi-line-container"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="GROUP16" class="ladi-element ladi-animation-hidden">
                                        <div class="ladi-group">
                                            <div id="LINE3" class="ladi-element">
                                                <div class="ladi-line">
                                                    <div class="ladi-line-container"></div>
                                                </div>
                                            </div>
                                            <div id="HEADLINE35" class="ladi-element">
                                                <p class="ladi-headline ladi-transition">{{ currentSideConfig.event.year
                                                }}<br></p>
                                            </div>
                                            <div id="LINE4" class="ladi-element">
                                                <div class="ladi-line">
                                                    <div class="ladi-line-container"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="HEADLINE36" class="ladi-element ladi-animation-hidden">
                                <p class="ladi-headline ladi-transition">{{ currentSideConfig.event.time }}</p>
                            </div>
                            <div id="HEADLINE37" class="ladi-element ladi-animation-hidden">
                                <p class="ladi-headline ladi-transition">{{ currentSideConfig.event.lunarDate }}<br></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="SECTION5" class="ladi-section">
                <div class="ladi-section-background"></div>
                <div class="ladi-container">
                    <div id="BOX8" class="ladi-element">
                        <div class="ladi-box ladi-transition"></div>
                    </div>
                    <div id="GROUP51" class="ladi-element">
                        <div class="ladi-group">
                            <div id="GROUP73" class="ladi-element">
                                <div class="ladi-group">
                                    <div id="GROUP24" class="ladi-element">
                                        <div class="ladi-group">
                                            <div id="GROUP25" class="ladi-element">
                                                <div class="ladi-group">
                                                    <div id="BOX28" class="ladi-element ladi-animation-hidden" role="button" tabindex="0" title="Tone màu gợi ý: Trắng" @click="showToast('Dresscode gợi ý: Màu Trắng')">
                                                        <div class="ladi-box ladi-transition"></div>
                                                    </div>
                                                    <div id="BOX29" class="ladi-element ladi-animation-hidden" role="button" tabindex="0" title="Tone màu gợi ý: Be / Kem" @click="showToast('Dresscode gợi ý: Màu Be / Kem')">
                                                        <div class="ladi-box ladi-transition"></div>
                                                    </div>
                                                    <div id="BOX30" class="ladi-element ladi-animation-hidden" role="button" tabindex="0" title="Tone màu gợi ý: Hồng Pastel" @click="showToast('Dresscode gợi ý: Màu Hồng Pastel')">
                                                        <div class="ladi-box ladi-transition"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="BOX31" class="ladi-element ladi-animation-hidden" role="button" tabindex="0" title="Tone màu gợi ý: Nâu Tây" @click="showToast('Dresscode gợi ý: Màu Nâu Tây')">
                                                <div class="ladi-box ladi-transition"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="GROUP35" class="ladi-element ladi-animation-hidden">
                                        <div class="ladi-group">
                                            <div id="HEADLINE135" class="ladi-element">
                                                <p class="ladi-headline ladi-transition">Màu sắc trang phục<br></p>
                                            </div>
                                            <div id="LINE11" class="ladi-element">
                                                <div class="ladi-line">
                                                    <div class="ladi-line-container"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="GROUP36" class="ladi-element ladi-animation-hidden">
                                <div class="ladi-group">
                                    <div id="HEADLINE38" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">{{ currentSideConfig.timelineTitle ||
                                            'Lịch trình buổi tiệc' }}<br></p>
                                    </div>
                                    <div id="LINE10" class="ladi-element">
                                        <div class="ladi-line">
                                            <div class="ladi-line-container"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="IMAGE24" class="ladi-element ladi-animation-hidden">
                                <div class="ladi-image">
                                    <div class="ladi-image-background"></div>
                                </div>
                            </div>
                            <div id="HEADLINE39" class="ladi-element ladi-animation-hidden">
                                <p class="ladi-headline ladi-transition">
                                    <span class="timeline-time">{{ currentSideConfig.timeline[0]?.time }}</span>
                                    <span class="timeline-title">{{ currentSideConfig.timeline[0]?.title }}</span>
                                </p>
                            </div>
                            <div id="IMAGE25" class="ladi-element ladi-animation-hidden">
                                <div class="ladi-image">
                                    <div class="ladi-image-background"></div>
                                </div>
                            </div>
                            <div id="HEADLINE40" class="ladi-element ladi-animation-hidden">
                                <p class="ladi-headline ladi-transition">
                                    <span class="timeline-time">{{ currentSideConfig.timeline[1]?.time }}</span>
                                    <span class="timeline-title">{{ currentSideConfig.timeline[1]?.title }}</span>
                                </p>
                            </div>
                            <div id="IMAGE48" class="ladi-element ladi-animation-hidden">
                                <div class="ladi-image">
                                    <div class="ladi-image-background"></div>
                                </div>
                            </div>
                            <div id="HEADLINE146" class="ladi-element ladi-animation-hidden">
                                <p class="ladi-headline ladi-transition">
                                    <span class="timeline-time">{{ currentSideConfig.timeline[2]?.time }}</span>
                                    <span class="timeline-title">{{ currentSideConfig.timeline[2]?.title }}</span>
                                </p>
                            </div>
                            <div id="LINE5" class="ladi-element ladi-animation-hidden">
                                <div class="ladi-line">
                                    <div class="ladi-line-container"></div>
                                </div>
                            </div>
                            <div id="BOX50" class="ladi-element ladi-animation-hidden">
                                <div class="ladi-box ladi-transition"></div>
                            </div>
                            <div id="BOX9" class="ladi-element ladi-animation-hidden">
                                <div class="ladi-box ladi-transition"></div>
                            </div>
                            <div id="BOX10" class="ladi-element ladi-animation-hidden">
                                <div class="ladi-box ladi-transition"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="SECTION6" class="ladi-section">
                <div class="ladi-section-background"></div>
                <div class="ladi-container">
                    <div id="IMAGE26" class="ladi-element">
                        <div class="ladi-image">
                            <div class="ladi-image-background"></div>
                        </div>
                    </div>
                    <div id="IMAGE27" class="ladi-element ladi-animation-hidden">
                        <div class="ladi-image">
                            <div class="ladi-image-background"></div>
                        </div>
                    </div>
                    <div id="HEADLINE41" class="ladi-element ladi-animation-hidden">
                        <p class="ladi-headline ladi-transition">Từ hai người xa lạ, chúng mình dần trở thành một nửa
                            của nhau qua những điều giản dị mỗi ngày. Giờ đây, khi hành trình mới sắp bắt đầu, chúng
                            mình muốn có những người thân thương ở bên để cùng chia sẻ niềm vui này.<br>
                        </p>
                    </div>
                    <div id="IMAGE28" class="ladi-element">
                        <div class="ladi-image">
                            <div class="ladi-image-background"></div>
                        </div>
                    </div>
                    <div id="IMAGE29" class="ladi-element">
                        <div class="ladi-image">
                            <div class="ladi-image-background"></div>
                        </div>
                    </div>
                    <div id="HEADLINE42" class="ladi-element ladi-animation-hidden">
                        <p class="ladi-headline ladi-transition">Hôm nay là ngày chúng mình cùng nắm tay<br>&nbsp;bước
                            vào
                            hành trình mới -
                            hành trình<br>của yêu thương và sẻ chia.
                            <br>
                        </p>
                    </div>
                    <div id="IMAGE30" class="ladi-element">
                        <div class="ladi-image">
                            <div class="ladi-image-background"></div>
                        </div>
                    </div>
                    <div id="GROUP43" class="ladi-element">
                        <div class="ladi-group">
                            <div id="HEADLINE81" class="ladi-element">
                                <h3 class="ladi-headline ladi-transition">Tháng Mười Hai<br></h3>
                            </div>
                            <div id="GROUP37" class="ladi-element">
                                <div class="ladi-group">
                                    <div id="GROUP69" class="ladi-element">
                                        <div class="ladi-group">
                                            <div id="HEADLINE91" class="ladi-element">
                                                <p class="ladi-headline ladi-transition">THỨ HAI</p>
                                            </div>
                                            <div id="HEADLINE92" class="ladi-element">
                                                <p class="ladi-headline ladi-transition">THỨ BA</p>
                                            </div>
                                            <div id="HEADLINE93" class="ladi-element">
                                                <p class="ladi-headline ladi-transition">THỨ TƯ</p>
                                            </div>
                                            <div id="HEADLINE94" class="ladi-element">
                                                <p class="ladi-headline ladi-transition">THỨ NĂM</p>
                                            </div>
                                            <div id="HEADLINE95" class="ladi-element">
                                                <p class="ladi-headline ladi-transition">THỨ SÁU</p>
                                            </div>
                                            <div id="HEADLINE96" class="ladi-element">
                                                <p class="ladi-headline ladi-transition">THỨ BẢY</p>
                                            </div>
                                            <div id="HEADLINE97" class="ladi-element">
                                                <p class="ladi-headline ladi-transition">CHỦ NHẬT</p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Lịch chuẩn Tháng 12/2026 (December 2026: 31 ngày, ngày 1 vào Thứ Ba) -->
                                    <div v-for="item in calendarDays2026" :key="item.day"
                                        class="ladi-element calendar-day-number"
                                        :class="{ 'is-highlighted': item.day === highlightedWeddingDay }"
                                        :style="{ top: `${item.top}px`, left: `${item.left}px` }">
                                        <p class="ladi-headline ladi-transition">{{ item.day }}<br></p>
                                    </div>

                                    <!-- Trái tim khoanh ngày cưới: Nhà trai (27/12/2026), Nhà gái (26/12/2026) -->
                                    <div id="IMAGE33" class="ladi-element ladi-animation-hidden" :style="heartStyle">
                                        <div class="ladi-image">
                                            <div class="ladi-image-background"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="GROUP74" class="ladi-element">
                        <div class="ladi-group">
                            <div id="GROUP26" class="ladi-element">
                                <div class="ladi-group">
                                    <div id="IMAGE45" class="ladi-element">
                                        <div class="ladi-image">
                                            <div class="ladi-image-background"></div>
                                        </div>
                                    </div>
                                    <div id="BOX32" class="ladi-element">
                                        <div class="ladi-box"></div>
                                    </div>
                                    <div id="IMAGE46" class="ladi-element">
                                        <div class="ladi-image">
                                            <div class="ladi-image-background"></div>
                                        </div>
                                    </div>
                                    <div id="BOX33" class="ladi-element">
                                        <div class="ladi-box"></div>
                                    </div>
                                </div>
                            </div>
                            <div id="GROUP27" class="ladi-element ladi-animation-hidden">
                                <div class="ladi-group">
                                    <div id="HEADLINE136" class="ladi-element">
                                        <p class="ladi-headline">Cô dâu</p>
                                    </div>
                                    <div id="HEADLINE137" class="ladi-element">
                                        <p class="ladi-headline">Thu Trang<br></p>
                                    </div>
                                </div>
                            </div>
                            <div id="GROUP28" class="ladi-element ladi-animation-hidden">
                                <div class="ladi-group">
                                    <div id="HEADLINE138" class="ladi-element">
                                        <p class="ladi-headline">Chú rể</p>
                                    </div>
                                    <div id="HEADLINE139" class="ladi-element">
                                        <p class="ladi-headline">Xuân Thành<br></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="SECTION7" class="ladi-section">
                <div class="ladi-section-background"></div>
                <div class="ladi-container">
                    <div id="GROUP75" class="ladi-element">
                        <div class="ladi-group">
                            <div id="BOX14" class="ladi-element">
                                <div class="ladi-box ladi-transition"></div>
                            </div>
                            <div id="GROUP31" class="ladi-element ladi-animation-hidden">
                                <div class="ladi-group">
                                    <div id="HEADLINE140" class="ladi-element">
                                        <p class="ladi-headline">KHOẢNH KHẮC<br></p>
                                    </div>
                                    <div id="HEADLINE142" class="ladi-element">
                                        <p class="ladi-headline">của</p>
                                    </div>
                                    <div id="HEADLINE141" class="ladi-element">
                                        <p class="ladi-headline">YÊU THƯƠNG<br></p>
                                    </div>
                                </div>
                            </div>
                            <div id="BOX42" class="ladi-element ladi-animation-hidden">
                                <div class="ladi-box"></div>
                            </div>
                            <div id="BOX43" class="ladi-element ladi-animation-hidden">
                                <div class="ladi-box"></div>
                            </div>
                            <div id="BOX44" class="ladi-element ladi-animation-hidden">
                                <div class="ladi-box"></div>
                            </div>
                            <div id="BOX45" class="ladi-element ladi-animation-hidden">
                                <div class="ladi-box"></div>
                            </div>
                            <div id="GROUP68" class="ladi-element">
                                <div class="ladi-group">
                                    <div id="BOX46" class="ladi-element ladi-animation-hidden">
                                        <div class="ladi-box"></div>
                                    </div>
                                    <div id="BOX47" class="ladi-element ladi-animation-hidden">
                                        <div class="ladi-box"></div>
                                    </div>
                                </div>
                            </div>
                            <div id="GROUP67" class="ladi-element">
                                <div class="ladi-group">
                                    <div id="BOX48" class="ladi-element ladi-animation-hidden">
                                        <div class="ladi-box"></div>
                                    </div>
                                    <div id="BOX49" class="ladi-element ladi-animation-hidden">
                                        <div class="ladi-box"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="SECTION8" class="ladi-section">
                <div class="ladi-section-background"></div>
                <div class="ladi-container">
                    <div id="IMAGE35" class="ladi-element">
                        <div class="ladi-image">
                            <div class="ladi-image-background"></div>
                        </div>
                    </div>
                    <div id="HEADLINE122" class="ladi-element ladi-animation-hidden">
                        <h3 class="ladi-headline ladi-transition">Hãy xác nhận sự có mặt của bạn để chúng mình<br>chuẩn
                            bị
                            đón tiếp một cách chu đáo nhất.<br>Trân trọng!&nbsp;<br></h3>
                    </div>
                    <div id="GROUP70" class="ladi-element">
                        <div class="ladi-group">
                            <div id="FORM2" is_auto_funnel="" data-config-id="68fefd387d9c4b005c27bfff"
                                class="ladi-element ladi-animation-hidden">
                                <form autocomplete="off" method="post" class="ladi-form"
                                    @submit.prevent="submitWishForm">
                                    <div id="BUTTON2" class="ladi-element ladi-animation-hidden" role="button"
                                        tabindex="0" @click.stop="submitWishForm">
                                        <div class="ladi-button ladi-transition"
                                            :class="{ 'is-loading': isSubmittingWish }" @click.stop="submitWishForm"
                                            @keydown.enter.stop="submitWishForm">
                                            <div class="ladi-button-background"></div>
                                            <div id="BUTTON_TEXT2" class="ladi-element ladi-button-headline"
                                                @click.stop="submitWishForm">
                                                <p class="ladi-headline ladi-transition">
                                                    {{ isSubmittingWish ? 'ĐANG GỬI...' : 'GỬI LỜI NHẮN & xác nhận' }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="FORM_ITEM2" class="ladi-element">
                                        <div class="ladi-form-item-container">
                                            <div class="ladi-form-item-background"></div>
                                            <div class="ladi-form-item"><input autocomplete="off" tabindex="1"
                                                    ref="nameInputRef" name="name" required class="ladi-form-control"
                                                    type="text" placeholder="Tên của bạn" v-model="wishForm.name"></div>
                                        </div>
                                    </div>
                                    <div id="FORM_ITEM3" class="ladi-element">
                                        <div class="ladi-form-item-container">
                                            <div class="ladi-form-item-background"></div>
                                            <div class="ladi-form-item"><textarea autocomplete="off" tabindex="2"
                                                    ref="messageInputRef" name="message" required
                                                    class="ladi-form-control"
                                                    placeholder="Gửi lời nhắn đến cô dâu chú rể"
                                                    v-model="wishForm.message"></textarea></div>
                                        </div>
                                    </div>
                                    <div id="FORM_ITEM4" class="ladi-element">
                                        <div class="ladi-form-item-container">
                                            <div class="ladi-form-item-background"></div>
                                            <div class="ladi-form-item"><select tabindex="3" name="form_item7"
                                                    class="ladi-form-control ladi-form-control-select"
                                                    v-model="wishForm.attending">
                                                    <option value="">Bạn sẽ đến chứ?</option>
                                                    <option value="Mình chắc chắn sẽ đến">Mình chắc chắn sẽ đến</option>
                                                    <option value="Xin lỗi mình bận rồi!">Xin lỗi mình bận rồi!</option>
                                                </select></div>
                                        </div>
                                    </div>
                                    <div id="FORM_ITEM5" class="ladi-element">
                                        <div class="ladi-form-item-container">
                                            <div class="ladi-form-item-background"></div>
                                            <div class="ladi-form-item"><select tabindex="4" name="form_item8"
                                                    class="ladi-form-control ladi-form-control-select"
                                                    v-model="wishForm.guestCount">
                                                    <option value="">Bạn tham dự cùng ai?</option>
                                                    <option value="1 người">1 người</option>
                                                    <option value="2 người">2 người</option>
                                                    <option value="3 người">3 người</option>
                                                    <option value="4 người">4 người</option>
                                                </select></div>
                                        </div>
                                    </div>
                                    <div id="FORM_ITEM6" class="ladi-element">
                                        <div class="ladi-form-item-container">
                                            <div class="ladi-form-item-background"></div>
                                            <div class="ladi-form-item"><select tabindex="5" name="form_item9"
                                                    class="ladi-form-control ladi-form-control-select"
                                                    v-model="wishForm.side">
                                                    <option value="">Bạn là khách mời của ai?</option>
                                                    <option value="Khách mời cô dâu">Khách mời cô dâu</option>
                                                    <option value="Khách mời chú rể">Khách mời chú rể</option>
                                                </select></div>
                                        </div>
                                    </div><button type="submit" class="ladi-hidden"
                                        :disabled="isSubmittingWish"></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="SECTION11" class="ladi-section">
                <div class="ladi-section-background"></div>
                <div class="ladi-container">
                    <div id="IMAGE72" class="ladi-element">
                        <div class="ladi-image">
                            <div class="ladi-image-background"></div>
                        </div>
                    </div>
                    <div id="IMAGE73" class="ladi-element">
                        <div class="ladi-image">
                            <div class="ladi-image-background"></div>
                        </div>
                    </div>
                    <div id="HTML_CODE2" class="ladi-element ladi-animation-hidden">
                        <div class="ladi-html-code">
                            <div id="jmii-wishes">

                                <!-- TIÊU ĐỀ -->

                                <div class="jmii-title">
                                    LỜI CHÚC
                                </div>

                                <div class="jmii-line"></div>

                                <div class="jmii-caption">
                                    Những lời nhắn từ người thân thương
                                </div>


                                <!-- KHUNG CUỘN LỜI CHÚC TỰ ĐỘNG CẬP NHẬT TỪ FILE JSON -->

                                <div id="jmii-scroll">

                                    <!-- TRẠNG THÁI ĐANG TẢI -->
                                    <div v-if="isLoadingWishes" class="jmii-loading-box">
                                        <span class="loading-spin-heart">💌</span>
                                        <div class="loading-text">Đang tải những lời chúc yêu thương...</div>
                                    </div>

                                    <!-- TRẠNG THÁI CHƯA CÓ LỜI CHÚC NÀO (EMPTY STATE) -->
                                    <div v-else-if="wishes.length === 0" class="jmii-empty-container">
                                        <div class="empty-icon-box">
                                            <span class="empty-main-icon">💌</span>
                                            <span class="empty-sparkle sp-1">✨</span>
                                            <span class="empty-sparkle sp-2">🌸</span>
                                        </div>
                                        <div class="empty-title">Hãy là người đầu tiên gửi gắm yêu thương!</div>
                                        <div class="empty-desc">
                                            Hòm thư của cô dâu &amp; chú rể đang mong chờ những lời chúc ngọt ngào từ
                                            bạn. Hãy là người mở đầu cho cuốn sổ lưu bút ý nghĩa này nhé! 💕
                                        </div>
                                        <button type="button" class="empty-action-btn" @click="focusWishForm">
                                            <span class="btn-pen">✍️</span> Gửi lời chúc ngay
                                        </button>
                                        <div class="empty-quick-wishes">
                                            <div class="quick-chip-label">✨ Gợi ý lời chúc nhanh:</div>
                                            <button type="button" class="quick-chip"
                                                @click="pickQuickWish('Chúc hai bạn trăm năm hạnh phúc, đầu bạc răng long! 💍')">
                                                "Trăm năm hạnh phúc! 💍"
                                            </button>
                                            <button type="button" class="quick-chip"
                                                @click="pickQuickWish('Chúc tân lang tân nương mãi ngọt ngào và hạnh phúc viên mãn! ❤️')">
                                                "Mãi ngọt ngào như ngày đầu! ❤️"
                                            </button>
                                            <button type="button" class="quick-chip"
                                                @click="pickQuickWish('Mừng ngày chung đôi! Chúc hai bạn cùng nhau xây tổ ấm thật rực rỡ! 🥂')">
                                                "Mừng ngày chung đôi! 🥂"
                                            </button>
                                        </div>
                                    </div>

                                    <!-- DANH SÁCH LỜI CHÚC THẬT TỪ DATA JSON -->
                                    <div v-else id="jmii-list">
                                        <div v-for="item in wishes" :key="item.id" class="jmii-wish animate-wish">
                                            <div class="jmii-wish-header">
                                                <div class="jmii-name">{{ item.name }}</div>
                                                <span v-if="item.side" class="jmii-side-badge"
                                                    :class="item.side.includes('chú rể') ? 'groom-badge' : 'bride-badge'">
                                                    {{ item.side.includes('chú rể') ? 'Nhà trai' : 'Nhà gái' }}
                                                </span>
                                                <span v-if="item.attending && item.attending.includes('sẽ đến')"
                                                    class="jmii-attend-badge">
                                                    ✓ Tham dự
                                                </span>
                                                <span class="jmii-time">{{ formatWishTime(item.createdAt) }}</span>
                                            </div>
                                            <div class="jmii-message">{{ item.message }}</div>
                                        </div>
                                    </div>

                                </div>

                            </div>



                        </div>
                    </div>
                </div>
            </div>
            <div id="SECTION9" class="ladi-section">
                <div class="ladi-section-background"></div>
                <div class="ladi-container">
                    <div id="BOX22" class="ladi-element">
                        <div class="ladi-box ladi-transition"></div>
                    </div>
                    <div id="BOX51" class="ladi-element">
                        <div class="ladi-box ladi-transition"></div>
                    </div>
                    <div id="GROUP71" class="ladi-element">
                        <div class="ladi-group">
                            <div id="HEADLINE129" class="ladi-element ladi-animation-hidden">
                                <h2 class="ladi-headline ladi-transition">Cảm ơn bạn đã dành tình cảm cho chúng
                                    mình!<br>Sự
                                    hiện diện của bạn chính là món quà ý nghĩa nhất, và chúng mình vô cùng trân quý khi
                                    được
                                    cùng bạn chia sẻ niềm hạnh phúc trong ngày trọng đại này.</h2>
                            </div>
                            <div id="HEADLINE130" class="ladi-element ladi-animation-hidden">
                                <h3 class="ladi-headline ladi-transition">Xin chân thành cảm ơn!<br></h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="SECTION_POPUP" class="ladi-section">
                <div class="ladi-section-background"></div>
                <div class="ladi-container">
                    <div id="POPUP3" class="ladi-element">
                        <div class="ladi-popup">
                            <div class="ladi-popup-background"></div>
                            <div id="GALLERY1" class="ladi-element" data-max-item="9" data-runtime-id="ECzFawHZNN"
                                data-current="5" data-is-next="true" data-scrolled="true" data-loaded="true"
                                data-next-time="1794990900393">
                                <div class="ladi-gallery ladi-gallery-bottom">
                                    <div class="ladi-gallery-view" style="cursor: pointer;">
                                        <div class="ladi-gallery-view-arrow ladi-gallery-view-arrow-left"></div>
                                        <div class="ladi-gallery-view-arrow ladi-gallery-view-arrow-right"></div>
                                        <div class="ladi-gallery-view-item" data-index="0"></div>
                                        <div class="ladi-gallery-view-item" data-index="1"></div>
                                        <div class="ladi-gallery-view-item" data-index="2"></div>
                                        <div class="ladi-gallery-view-item" data-index="3"></div>
                                        <div class="ladi-gallery-view-item" data-index="4"></div>
                                        <div class="ladi-gallery-view-item selected" data-index="5"></div>
                                        <div class="ladi-gallery-view-item" data-index="6"></div>
                                        <div class="ladi-gallery-view-item" data-index="7"></div>
                                        <div class="ladi-gallery-view-item" data-index="8"></div>
                                    </div>
                                    <div class="ladi-gallery-control">
                                        <div class="ladi-gallery-control-box" style="left: 0px;">
                                            <div class="ladi-gallery-control-item" data-index="0"></div>
                                            <div class="ladi-gallery-control-item" data-index="1"></div>
                                            <div class="ladi-gallery-control-item" data-index="2"></div>
                                            <div class="ladi-gallery-control-item" data-index="3"></div>
                                            <div class="ladi-gallery-control-item" data-index="4"></div>
                                            <div class="ladi-gallery-control-item selected" data-index="5"></div>
                                            <div class="ladi-gallery-control-item" data-index="6"></div>
                                            <div class="ladi-gallery-control-item" data-index="7"></div>
                                            <div class="ladi-gallery-control-item" data-index="8"></div>
                                        </div>
                                        <div
                                            class="ladi-gallery-control-arrow ladi-gallery-control-arrow-left opacity-0">
                                        </div>
                                        <div
                                            class="ladi-gallery-control-arrow ladi-gallery-control-arrow-right opacity-0">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="backdrop-popup" class="backdrop-popup"></div>
        <div id="backdrop-dropbox" class="backdrop-dropbox"></div>
        <div id="lightbox-screen" class="lightbox-screen"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter, useHead } from '#imports'
import { weddingShared, weddingSides, resolveWeddingSide, formatInvitationLead, type WeddingSide } from '~/data/wedding.config'

const route = useRoute()
const router = useRouter()

// 1. Phân biệt Nhà trai / Nhà gái từ param URL (?side=trai | ?side=gai)
// Hỗ trợ cả các biến thể như ?nha=trai|gai, ?side=nhagai|nhatrai, ?t=...
const currentSide = computed<WeddingSide>(() => {
    const raw = route.query.side || route.query.nha || route.query.type || route.query.t
    return resolveWeddingSide(raw as string)
})

const currentSideConfig = computed(() => weddingSides[currentSide.value])
const sharedConfig = weddingShared

const switchSide = (side: WeddingSide) => {
    router.push({
        query: {
            ...route.query,
            side
        }
    })
}

// Lịch Tháng 12/2026 (December 2026: 31 ngày, ngày 1 bắt đầu vào Thứ Ba)
// 7 cột phân bổ đều với độ rộng 56px mỗi cột (left: 0, 56, 112, 168, 224, 280, 336)
// Lề 2 bên thu gọn từ 43px xuống 14px giúp lịch to rõ và sát viền 2 bên chuẩn thiết kế
const calendarDays2026 = [
    // Hàng 1 (top: 48px)
    { day: 1, top: 48, left: 56 },
    { day: 2, top: 48, left: 112 },
    { day: 3, top: 48, left: 168 },
    { day: 4, top: 48, left: 224 },
    { day: 5, top: 48, left: 280 },
    { day: 6, top: 48, left: 336 },

    // Hàng 2 (top: 92px)
    { day: 7, top: 92, left: 0 },
    { day: 8, top: 92, left: 56 },
    { day: 9, top: 92, left: 112 },
    { day: 10, top: 92, left: 168 },
    { day: 11, top: 92, left: 224 },
    { day: 12, top: 92, left: 280 },
    { day: 13, top: 92, left: 336 },

    // Hàng 3 (top: 136px)
    { day: 14, top: 136, left: 0 },
    { day: 15, top: 136, left: 56 },
    { day: 16, top: 136, left: 112 },
    { day: 17, top: 136, left: 168 },
    { day: 18, top: 136, left: 224 },
    { day: 19, top: 136, left: 280 },
    { day: 20, top: 136, left: 336 },

    // Hàng 4 (top: 180px)
    { day: 21, top: 180, left: 0 },
    { day: 22, top: 180, left: 56 },
    { day: 23, top: 180, left: 112 },
    { day: 24, top: 180, left: 168 },
    { day: 25, top: 180, left: 224 },
    { day: 26, top: 180, left: 280 }, // SAT - Nhà gái (26/12/2026)
    { day: 27, top: 180, left: 336 }, // SUN - Nhà trai (27/12/2026)

    // Hàng 5 (top: 224px)
    { day: 28, top: 224, left: 0 },
    { day: 29, top: 224, left: 56 },
    { day: 30, top: 224, left: 112 },
    { day: 31, top: 224, left: 168 }
]

// Ngày cưới cần khoanh: Nhà gái -> 26, Nhà trai -> 27
const highlightedWeddingDay = computed(() => {
    return currentSide.value === 'gai' ? 26 : 27
})

// Tọa độ định vị trái tim (#IMAGE33) quanh đúng ngày cưới theo từng bên:
// - Cột 5 (SAT): tâm 308px -> left = 308 - 23 = 285px
// - Cột 6 (SUN): tâm 364px -> left = 364 - 23 = 341px
// - Hàng 4: top ngày cưới 180px, tâm số 193px -> top tim = 174px
const heartStyle = computed(() => {
    if (currentSide.value === 'gai') {
        return {
            top: '174px',
            left: '285px'
        }
    }
    return {
        top: '174px',
        left: '341px'
    }
})

// 2. Tên khách mời từ param URL (?to=, ?guest=, ?name=, ?khach=, ?k=, ?u=)
// Ví dụ: ?to=Anh Hoàng -> TRÂN TRỌNG KÍNH MỜI ANH HOÀNG ĐẾN DỰ LỄ ĂN HỎI CỦA
const guestName = computed(() => {
    const q = route.query
    const raw = q.to || q.guest || q.name || q.khach || q.k || q.u
    return raw ? String(raw).trim() : ''
})

const invitationLeadText = computed(() => {
    return formatInvitationLead(guestName.value, currentSide.value)
})

const onGuestInputChange = (e: Event) => {
    const val = (e.target as HTMLInputElement).value.trim()
    router.push({
        query: {
            ...route.query,
            to: val || undefined
        }
    })
}

// Cập nhật tiêu đề trang và thẻ meta động theo Nhà trai hoặc Nhà gái
useHead(() => ({
    title: currentSideConfig.value.meta.title,
    meta: [
        { name: 'description', content: currentSideConfig.value.meta.description },
        { property: 'og:title', content: currentSideConfig.value.meta.title },
        { property: 'og:description', content: currentSideConfig.value.meta.description }
    ]
}))

const toastMessage = ref('')
const isPlaying = ref(false)
const countdownDays = ref('00')
const countdownHours = ref('00')
const countdownMinutes = ref('00')
const countdownSeconds = ref('00')
let audio: HTMLAudioElement | null = null
let countdownTimer: any = null
let animationObserver: IntersectionObserver | null = null

const showToast = (msg: string) => {
    toastMessage.value = msg
    setTimeout(() => {
        toastMessage.value = ''
    }, 2500)
}

// 1. Mobile Viewport Auto-scaling for all mobile screens (iPhone SE 375px, 390px, 360px, etc.)
const initViewport = () => {
    if (typeof window === 'undefined') return
    const applyScaling = () => {
        const w = window.innerWidth
        const wraper = document.querySelector('.ladi-wraper') as HTMLElement | null
        if (!wraper) return
        if (w <= 420 && w > 0) {
            const scale = w / 420
            wraper.style.zoom = String(scale)
        } else {
            wraper.style.zoom = ''
        }
    }

    applyScaling()
    window.addEventListener('resize', applyScaling)
    window.addEventListener('orientationchange', applyScaling)
}

// 2. Audio Player Logic (iOS + Android + Desktop)
const initAudio = () => {
    audio = new Audio(encodeURI('/audio/Ngày Này, Người Con Gái Này.mp3'))
    audio.loop = true

    const toggleBtn = document.getElementById('music-toggle')
    const iconOn = document.getElementById('icon-on')
    const iconOff = document.getElementById('icon-off')

    const updateIcon = (playing: boolean) => {
        if (toggleBtn) {
            if (playing) {
                toggleBtn.classList.add('playing')
                toggleBtn.setAttribute('aria-pressed', 'true')
                toggleBtn.setAttribute('title', 'Tắt nhạc')
            } else {
                toggleBtn.classList.remove('playing')
                toggleBtn.setAttribute('aria-pressed', 'false')
                toggleBtn.setAttribute('title', 'Bật nhạc')
            }
        }
        if (iconOn) iconOn.style.display = playing ? 'block' : 'none'
        if (iconOff) iconOff.style.display = playing ? 'none' : 'block'
    }

    const safePlay = async () => {
        if (!audio) return
        try {
            await audio.play()
            isPlaying.value = true
            updateIcon(true)
        } catch (e) {
            isPlaying.value = false
            updateIcon(false)
        }
    }

    const pauseMusic = () => {
        if (audio) audio.pause()
        isPlaying.value = false
        updateIcon(false)
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', (ev) => {
            ev.preventDefault()
            if (isPlaying.value) {
                pauseMusic()
            } else {
                safePlay()
            }
        })

        toggleBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                toggleBtn.click()
            }
        })
    }

    // Play on first interaction (iOS / Desktop)
    const onFirstGesture = () => {
        if (!isPlaying.value) safePlay()
        window.removeEventListener('touchstart', onFirstGesture)
        window.removeEventListener('click', onFirstGesture)
    }

    window.addEventListener('touchstart', onFirstGesture, { once: true, passive: true })
    window.addEventListener('click', onFirstGesture, { once: true })
}

// 3. Live Countdown Timer
const calculateCountdownValues = () => {
    const target = new Date(currentSideConfig.value.event.date).getTime()
    const now = Date.now()
    const diff = target - now
    if (diff <= 0) {
        countdownDays.value = '00'
        countdownHours.value = '00'
        countdownMinutes.value = '00'
        countdownSeconds.value = '00'
        return
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24))
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const s = Math.floor((diff % (1000 * 60)) / 1000)

    countdownDays.value = d < 10 ? '0' + d : '' + d
    countdownHours.value = h < 10 ? '0' + h : '' + h
    countdownMinutes.value = m < 10 ? '0' + m : '' + m
    countdownSeconds.value = s < 10 ? '0' + s : '' + s
}

// Tính toán ngay lập tức để không bị giật số 00 khi mới vào trang
calculateCountdownValues()

const initCountdown = () => {
    if (countdownTimer) {
        clearInterval(countdownTimer)
    }
    calculateCountdownValues()
    countdownTimer = setInterval(calculateCountdownValues, 1000)
}

watch(currentSide, () => {
    initCountdown()
    nextTick(() => {
        document.querySelectorAll('.ladi-animation-hidden').forEach(el => {
            const rect = el.getBoundingClientRect()
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.remove('ladi-animation-hidden')
                el.classList.add('ladi-animation')
            }
        })
    })
})

// 4. Smooth Hardware-Accelerated Scroll Animations ("Scroll đến đâu hiệu ứng chạy tới đó")
let section2Observer: IntersectionObserver | null = null

const initScrollAnimations = () => {
    // Always reveal Section 1 immediately on page load (hero banner at top)
    document.querySelectorAll('#SECTION1 .ladi-animation-hidden').forEach(el => {
        el.classList.remove('ladi-animation-hidden')
        el.classList.add('ladi-animation')
    })

    // Pre-decode secondary decorative assets so there is zero rasterization jank
    const decoImages = [
        'https://w.ladicdn.com/s450x450/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0028_12-20251010160528-98e-4.png',
        'https://w.ladicdn.com/s400x400/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0030_hoa-lan-1-20251010160528-hwt_i.png',
        'https://w.ladicdn.com/s450x700/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0032_1-20251010160528-ebpkn.png',
        'https://w.ladicdn.com/s450x650/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0031_hoa-lan-20251010160528-rsw5l.png'
    ]
    decoImages.forEach(src => {
        const img = new Image()
        img.src = src
    })

    // Dedicated trigger for Section 2 (envelope, card rise up, and photo fly in)
    let sec2Triggered = false
    const triggerSection2 = () => {
        if (sec2Triggered) return
        sec2Triggered = true
        document.querySelectorAll('#SECTION2 .ladi-animation-hidden').forEach(el => {
            el.classList.remove('ladi-animation-hidden')
            el.classList.add('ladi-animation')
        })
        if (section2Observer) {
            section2Observer.disconnect()
            section2Observer = null
        }
    }

    if ('IntersectionObserver' in window) {
        const sec2 = document.getElementById('SECTION2')
        if (sec2) {
            section2Observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        triggerSection2()
                    }
                })
            }, {
                root: null,
                rootMargin: '0px 0px -50px 0px',
                threshold: 0.08
            })
            section2Observer.observe(sec2)
        }

        // Trigger animation right as element enters visible screen for Sections 3 to 11
        animationObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target as HTMLElement
                    target.classList.remove('ladi-animation-hidden')
                    target.classList.add('ladi-animation')
                    obs.unobserve(target)
                }
            })
        }, {
            root: null,
            rootMargin: '0px 0px -40px 0px',
            threshold: 0.08
        })

        // Observe all hidden elements (excluding SECTION1 and SECTION2)
        document.querySelectorAll('.ladi-animation-hidden').forEach(el => {
            if (el.closest('#SECTION1') || el.closest('#SECTION2')) return
            const rect = el.getBoundingClientRect()
            if (rect.top < window.innerHeight - 40 && rect.bottom > 0) {
                el.classList.remove('ladi-animation-hidden')
                el.classList.add('ladi-animation')
            } else {
                animationObserver?.observe(el)
            }
        })
    } else {
        // Fallback if IntersectionObserver not supported
        document.querySelectorAll('.ladi-animation-hidden').forEach(el => {
            el.classList.remove('ladi-animation-hidden')
            el.classList.add('ladi-animation')
        })
    }

    // Check immediately if page was reloaded already scrolled down past Section 2
    const sec2 = document.getElementById('SECTION2')
    if (sec2) {
        const rect = sec2.getBoundingClientRect()
        if (rect.top < window.innerHeight - 50 && rect.bottom > 0) {
            triggerSection2()
        }
    }
}

// 5. Quản lý Lời chúc (RSVP Wishes) lưu trữ vào file data/wishes.json
export interface WishItem {
    id: string
    name: string
    message: string
    attending?: string
    guestCount?: string
    side?: string
    createdAt: string
}

const nameInputRef = ref<HTMLInputElement | null>(null)
const messageInputRef = ref<HTMLTextAreaElement | null>(null)
const isSubmittingWish = ref(false)
const isLoadingWishes = ref(true)
const wishes = ref<WishItem[]>([])

const wishForm = reactive({
    name: '',
    message: '',
    attending: '',
    guestCount: '',
    side: ''
})

// Tự động điền tên khách mời từ URL nếu có
watch(guestName, (newVal) => {
    if (newVal && !wishForm.name) {
        wishForm.name = newVal
    }
}, { immediate: true })

// Tự động gán bên tham dự (Nhà gái / Nhà trai) theo bên đang xem
watch(currentSide, (newSide) => {
    if (!wishForm.side) {
        wishForm.side = newSide === 'gai' ? 'Khách mời cô dâu' : 'Khách mời chú rể'
    }
}, { immediate: true })

// Tải danh sách lời chúc từ server API (/api/wishes)
const fetchWishes = async () => {
    isLoadingWishes.value = true
    try {
        const res = await $fetch<{ success: boolean; wishes: WishItem[] }>('/api/wishes')
        if (res && res.success && Array.isArray(res.wishes)) {
            wishes.value = res.wishes
        }
    } catch (err) {
        console.error('Lỗi khi tải danh sách lời chúc:', err)
    } finally {
        isLoadingWishes.value = false
    }
}

// Định dạng thời gian gửi lời chúc hiển thị thân thiện (Vừa xong, 5 phút trước, dd/MM/yyyy)
const formatWishTime = (dateStr?: string) => {
    if (!dateStr) return ''
    try {
        // Hỗ trợ định dạng chuỗi thời gian từ Google Sheet (ví dụ: "20:30:15 25/11/2026")
        if (dateStr.includes('/')) {
            const parts = dateStr.trim().split(/[\s,]+/)
            const datePart = parts.find(p => p.includes('/'))
            return datePart || dateStr
        }

        const date = new Date(dateStr)
        if (isNaN(date.getTime())) return dateStr
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffMinutes = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)
        const diffDays = Math.floor(diffMs / 86400000)

        if (diffMinutes < 1) return 'Vừa xong'
        if (diffMinutes < 60) return `${diffMinutes} phút trước`
        if (diffHours < 24) return `${diffHours} giờ trước`
        if (diffDays === 1) return 'Hôm qua'
        if (diffDays < 7) return `${diffDays} ngày trước`

        const pad = (n: number) => (n < 10 ? '0' + n : '' + n)
        return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`
    } catch {
        return dateStr || ''
    }
}

// Cuộn mượt đến form gửi lời chúc và focus vào ô nhập
const focusWishForm = () => {
    const formSection = document.getElementById('SECTION8')
    if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    setTimeout(() => {
        if (!wishForm.name && nameInputRef.value) {
            nameInputRef.value.focus()
            nameInputRef.value.classList.add('input-highlight')
            setTimeout(() => nameInputRef.value?.classList.remove('input-highlight'), 1600)
        } else if (messageInputRef.value) {
            messageInputRef.value.focus()
            messageInputRef.value.classList.add('input-highlight')
            setTimeout(() => messageInputRef.value?.classList.remove('input-highlight'), 1600)
        }
    }, 450)
}

// Chọn nhanh lời chúc gợi ý từ danh sách empty state
const pickQuickWish = (text: string) => {
    wishForm.message = text
    focusWishForm()
    showToast('Đã chọn gợi ý! Bạn có thể chỉnh sửa thêm nếu muốn ✨')
}

// Xử lý gửi lời chúc và lưu vào file JSON
const submitWishForm = async () => {
    if (isSubmittingWish.value) return

    // Hỗ trợ cả Vue v-model và fallback trực tiếp từ DOM input
    const nameEl = document.querySelector('#FORM2 input[name="name"]') as HTMLInputElement | null
    const msgEl = document.querySelector('#FORM2 textarea[name="message"]') as HTMLTextAreaElement | null
    const attendEl = document.querySelector('#FORM2 select[name="form_item7"]') as HTMLSelectElement | null
    const countEl = document.querySelector('#FORM2 select[name="form_item8"]') as HTMLSelectElement | null
    const sideEl = document.querySelector('#FORM2 select[name="form_item9"]') as HTMLSelectElement | null

    const name = (wishForm.name || nameEl?.value || '').trim()
    const message = (wishForm.message || msgEl?.value || '').trim()
    const attending = (wishForm.attending || attendEl?.value || '').trim()
    const guestCount = (wishForm.guestCount || countEl?.value || '').trim()
    const side = (wishForm.side || sideEl?.value || '').trim()

    if (!name) {
        showToast('Vui lòng nhập tên của bạn!')
        if (nameEl) nameEl.focus()
        else nameInputRef.value?.focus()
        return
    }

    if (!message) {
        showToast('Vui lòng để lại lời nhắn chúc mừng nhé!')
        if (msgEl) msgEl.focus()
        else messageInputRef.value?.focus()
        return
    }

    isSubmittingWish.value = true
    try {
        const res = await $fetch<{ success: boolean; wish: WishItem }>('/api/wishes', {
            method: 'POST',
            body: {
                name,
                message,
                attending,
                guestCount,
                side
            }
        })

        if (res && res.success && res.wish) {
            // Chèn lời chúc mới lên đầu danh sách hiển thị
            wishes.value.unshift(res.wish)
            wishForm.message = ''
            if (msgEl) msgEl.value = ''

            // Chỉ hiển thị toast thông báo thành công gọn gàng (không mở modal)
            showToast('Cảm ơn bạn đã gửi lời chúc mừng! ❤️')

            // Cuộn mượt nhẹ xuống khung lời chúc
            setTimeout(() => {
                const wishesSection = document.getElementById('SECTION11')
                if (wishesSection) {
                    wishesSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
                }
            }, 400)
        }
    } catch (err: any) {
        console.error('Lỗi khi gửi lời chúc:', err)
        showToast(err?.data?.statusMessage || 'Có lỗi xảy ra, bạn vui lòng thử lại nhé!')
    } finally {
        isSubmittingWish.value = false
    }
}

// 6. Popups & Actions
const initPopupsAndActions = () => {
    const backdrop = document.getElementById('backdrop-popup')
    const popup3 = document.getElementById('POPUP3') // Lightbox gallery

    const closeAllPopups = () => {
        if (backdrop) backdrop.classList.remove('is-active')
        if (popup3) popup3.classList.remove('is-active')
    }

    if (backdrop) {
        backdrop.addEventListener('click', closeAllPopups)
    }

    // Close buttons inside popups
    document.querySelectorAll('.ladi-popup-close, .popup-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            closeAllPopups()
        })
    })

    // Đảm bảo click vào nút GỬI LỜI NHẮN & XÁC NHẬN luôn kích hoạt
    const btn2 = document.getElementById('BUTTON2')
    if (btn2) {
        btn2.style.cursor = 'pointer'
        btn2.addEventListener('click', (e) => {
            e.preventDefault()
            submitWishForm()
        })
    }

    const formEl = document.querySelector('#FORM2 form') as HTMLFormElement | null
    if (formEl) {
        formEl.addEventListener('submit', (e) => {
            e.preventDefault()
            submitWishForm()
        })
    }

    // Map directions button (BUTTON1)
    const btnMap = document.getElementById('BUTTON1')
    if (btnMap) {
        btnMap.style.cursor = 'pointer'
        btnMap.addEventListener('click', () => {
            window.open(currentSideConfig.value.event.mapUrl, '_blank')
        })
    }
}

onMounted(() => {
    initViewport()
    initAudio()
    initCountdown()
    initScrollAnimations()
    initPopupsAndActions()
    fetchWishes()
})

onUnmounted(() => {
    if (audio) {
        audio.pause()
        audio = null
    }
    if (countdownTimer) {
        clearInterval(countdownTimer)
    }
    if (animationObserver) {
        animationObserver.disconnect()
    }
    if (section2Observer) {
        section2Observer.disconnect()
    }
})
</script>

<style scoped>
.wedding-root {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    background-color: #f0eae1;
    overflow-x: hidden;
}

/* Tự động co giãn (responsive scale) chuẩn xác trên toàn bộ các dòng máy màn hình nhỏ (iPhone SE 375px, 360px, 390px...) */
@media screen and (max-width: 420px) {
    .wedding-root {
        display: block !important;
        width: 100vw !important;
        max-width: 100vw !important;
        overflow-x: hidden !important;
    }

    .wedding-root :deep(.ladi-wraper) {
        width: 420px !important;
        margin: 0 auto !important;
        transform-origin: top center;
        zoom: calc(100vw / 420);
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Floating Side Switcher (Nhà trai / Nhà gái) */
.side-switcher-bar {
    display: none !important;
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 99998;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 6px;
    background: rgba(255, 255, 255, 0.88);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(181, 163, 126, 0.45);
    border-radius: 999px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    user-select: none;
}

.side-btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 6px 14px;
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    color: #6d6253;
    background: transparent;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.25s ease;
    outline: none;
}

.side-btn:hover {
    background: rgba(181, 163, 126, 0.15);
    color: #2b2b2b;
}

.side-btn.active {
    background: linear-gradient(135deg, #b59b73 0%, #8f7952 100%);
    color: #ffffff;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(143, 121, 82, 0.35);
}

.side-btn .icon {
    font-size: 13px;
    line-height: 1;
}

.side-btn .label {
    letter-spacing: 0.3px;
}

/* Guest input in floating switcher */
.guest-switcher-wrap {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-left: 2px;
    padding: 3px 8px;
    background: rgba(245, 240, 230, 0.7);
    border: 1px dashed rgba(181, 163, 126, 0.6);
    border-radius: 999px;
    transition: all 0.25s ease;
}

.guest-switcher-wrap:focus-within {
    background: #ffffff;
    border-color: #927e5a;
    box-shadow: 0 0 0 2px rgba(181, 163, 126, 0.25);
}

.guest-icon {
    font-size: 12px;
}

.guest-quick-input {
    width: 105px;
    border: none;
    background: transparent;
    font-family: inherit;
    font-size: 12px;
    color: #3f3930;
    outline: none;
}

.guest-quick-input::placeholder {
    color: #a39580;
    font-size: 11px;
}

/* Tùy biến phân lớp Section 2 & Các bông hoa lan (#IMAGE15, #IMAGE17, #IMAGE18) */
:deep(#IMAGE2) {
    z-index: 1 !important;
}

:deep(#IMAGE4) {
    z-index: 2 !important;
}

:deep(#GROUP6) {
    z-index: 3 !important;
}

:deep(#GROUP6 > .ladi-group > .ladi-element) {
    z-index: 10 !important;
}

:deep(#IMAGE11) {
    z-index: 1 !important;
}

:deep(#IMAGE13) {
    z-index: 5 !important;
}

:deep(#IMAGE8) {
    z-index: 6 !important;
}

:deep(#IMAGE14) {
    z-index: 7 !important;
}

:deep(#GROUP7) {
    z-index: 10 !important;
}

:deep(#IMAGE15) {
    top: 96.8px !important;
    left: 284.828px !important;
    width: 72.3364px !important;
    height: 64.8274px !important;
    z-index: 30 !important;
}

:deep(#IMAGE17),
:deep(#IMAGE18) {
    z-index: 30 !important;
}

:deep(#HEADLINE7) {
    width: 236px !important;
    left: 12.469px !important;
    top: 13px !important;
    z-index: 12 !important;
}

:deep(#HEADLINE7 > .ladi-headline) {
    font-size: 10px !important;
    line-height: 1.45 !important;
    letter-spacing: 0.3px !important;
    text-transform: none !important;
    color: rgb(146, 131, 98) !important;
    text-align: center !important;
    position: relative !important;
    z-index: 10 !important;
}

:deep(#HEADLINE11) {
    width: 240px !important;
    left: 10.469px !important;
}

:deep(#HEADLINE11 > .ladi-headline) {
    font-size: 10.5px !important;
    line-height: 1.3 !important;
    letter-spacing: 0.5px !important;
    text-transform: uppercase !important;
    color: rgb(146, 131, 98) !important;
    text-align: center !important;
    white-space: nowrap !important;
}

:deep(.guest-name-highlight) {
    font-size: 12px !important;
    font-weight: 700 !important;
    color: #705628 !important;
    letter-spacing: 0.5px !important;
    display: inline-block;
    padding: 1px 0;
    position: relative !important;
    z-index: 12 !important;
}



:deep(#GROUP10),
:deep(#GROUP11) {
    opacity: 1 !important;
    visibility: visible !important;
}

:deep(#GROUP10 > .ladi-group),
:deep(#GROUP11 > .ladi-group) {
    opacity: 1 !important;
    visibility: visible !important;
}

:deep(#HEADLINE32) {
    top: 422px !important;
}

:deep(#HEADLINE29) {
    top: 446px !important;
    width: 380px !important;
    left: 35px !important;
}

:deep(#HEADLINE29 > .ladi-headline) {
    font-size: 17px !important;
    line-height: 1.35 !important;
    text-transform: uppercase !important;
    color: rgb(146, 131, 98) !important;
    text-align: center !important;
    letter-spacing: 0.3px;
    white-space: pre-line !important;
}

:deep(#HEADLINE30) {
    top: 504px !important;
    width: 380px !important;
    left: 35px !important;
}

:deep(#HEADLINE30 > .ladi-headline) {
    font-size: 13.5px !important;
    line-height: 1.4 !important;
    color: rgb(146, 131, 98) !important;
    text-align: center !important;
    letter-spacing: 0.2px;
}

:deep(#GROUP34) {
    top: 554px !important;
}

/* --- SECTION 5: LỊCH TRÌNH BUỔI TIỆC & MÀU SẮC TRANG PHỤC --- */
:deep(#GROUP51) {
    left: 0px !important;
    width: 420px !important;
}

:deep(#GROUP73) {
    left: 32px !important;
    width: 356px !important;
}

:deep(#GROUP36) {
    top: 15px !important;
    left: 12px !important;
    width: 380px !important;
    height: 48px !important;
    z-index: 5 !important;
}

:deep(#HEADLINE38) {
    width: 330px !important;
    left: 48px !important;
    top: 0px !important;
}

:deep(#HEADLINE38 > .ladi-headline) {
    font-family: 'VVZOSGhVGFMSdGY', 'Great Vibes', 'Playball', 'Lora', cursive, serif !important;
    font-size: 34px !important;
    line-height: 1.25 !important;
    color: #ffffff !important;
    text-align: left !important;
    font-style: italic !important;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.45) !important;
}

:deep(#LINE10) {
    top: 22px !important;
    left: 0px !important;
    width: 42px !important;
}

:deep(#LINE10 > .ladi-line > .ladi-line-container) {
    border-top: 1.5px solid rgba(255, 255, 255, 0.9) !important;
}

/* Khối Màu sắc trang phục & Palette: Cân đối khoảng cách phía dưới */
:deep(#GROUP73) {
    top: 330px !important;
    left: 55px !important;
}

:deep(#GROUP35) {
    width: 360px !important;
    height: 48px !important;
}

:deep(#HEADLINE135) {
    width: 300px !important;
    left: 0px !important;
    top: 0px !important;
}

:deep(#HEADLINE135 > .ladi-headline) {
    font-family: 'VVZOSGhVGFMSdGY', 'Great Vibes', 'Playball', 'Lora', cursive, serif !important;
    font-size: 34px !important;
    line-height: 1.25 !important;
    color: #ffffff !important;
    text-align: right !important;
    font-style: italic !important;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.45) !important;
}

:deep(#LINE11) {
    top: 22px !important;
    left: 306px !important;
    width: 50px !important;
}

:deep(#LINE11 > .ladi-line > .ladi-line-container) {
    border-top: 1.5px solid rgba(255, 255, 255, 0.9) !important;
}

:deep(#GROUP24) {
    top: 60px !important;
    left: 105px !important;
}

:deep(#BOX28),
:deep(#BOX29),
:deep(#BOX30),
:deep(#BOX31) {
    cursor: pointer !important;
}

:deep(#BOX28 > .ladi-box),
:deep(#BOX29 > .ladi-box),
:deep(#BOX30 > .ladi-box),
:deep(#BOX31 > .ladi-box) {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25) !important;
    border: 1.5px solid rgba(255, 255, 255, 0.6) !important;
    cursor: pointer !important;
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease !important;
}

:deep(#BOX28:hover > .ladi-box),
:deep(#BOX29:hover > .ladi-box),
:deep(#BOX30:hover > .ladi-box),
:deep(#BOX31:hover > .ladi-box),
:deep(#BOX28:active > .ladi-box),
:deep(#BOX29:active > .ladi-box),
:deep(#BOX30:active > .ladi-box),
:deep(#BOX31:active > .ladi-box) {
    transform: scale(1.22) translateY(-4px) !important;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.45) !important;
    z-index: 10 !important;
}

/* --- TRỤC DỌC & CÁC MỐC TIMELINE DÀN ĐỀU, THOÁNG ĐÃNG (TRỤC X = 175.0px, BỀ RỘNG 280px) --- */
:deep(#LINE5) {
    position: absolute !important;
    top: 80px !important;
    left: 174px !important;
    width: 2px !important;
    height: 180px !important;
    background: rgba(255, 255, 255, 0.75) !important;
    z-index: 2 !important;
    transform-origin: top center !important;
}

:deep(#LINE5 > .ladi-line) {
    display: none !important;
}

/* Chấm tròn: 10px x 10px, tâm chuẩn xác tại X = 170 + 5 = 175.0px */
:deep(#BOX9),
:deep(#BOX10),
:deep(#BOX50) {
    width: 10px !important;
    height: 10px !important;
    left: 170px !important;
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    z-index: 4 !important;
}

:deep(#BOX9 > .ladi-box),
:deep(#BOX10 > .ladi-box),
:deep(#BOX50 > .ladi-box) {
    width: 10px !important;
    height: 10px !important;
    border-radius: 50% !important;
    background-color: #ffffff !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.45) !important;
    border: none !important;
}

/* Mốc 1: Tâm Y = 95px (Cách Tiêu đề trên 65px) */
:deep(#IMAGE24) {
    top: 74px !important;
    left: 110px !important;
    width: 42px !important;
    height: 42px !important;
}

:deep(#BOX9) {
    top: 90px !important;
}

:deep(#HEADLINE39) {
    top: 74px !important;
    left: 200px !important;
    width: 205px !important;
}

/* Mốc 2: Tâm Y = 170px (Cách Mốc 1 đúng 75px) */
:deep(#IMAGE25) {
    top: 149px !important;
    left: 110px !important;
    width: 42px !important;
    height: 42px !important;
}

:deep(#BOX10) {
    top: 165px !important;
}

:deep(#HEADLINE40) {
    top: 149px !important;
    left: 200px !important;
    width: 205px !important;
}

/* Mốc 3: Tâm Y = 245px (Cách Mốc 2 đúng 75px; Cách Tiêu đề dưới 85px) */
:deep(#IMAGE48) {
    top: 224px !important;
    left: 110px !important;
    width: 42px !important;
    height: 42px !important;
}

:deep(#BOX50) {
    top: 240px !important;
}

:deep(#HEADLINE146) {
    top: 224px !important;
    left: 200px !important;
    width: 205px !important;
}

/* Căn chỉnh icon bên trong sắc nét, to rõ */
:deep(#IMAGE24 > .ladi-image > .ladi-image-background),
:deep(#IMAGE25 > .ladi-image > .ladi-image-background),
:deep(#IMAGE48 > .ladi-image > .ladi-image-background) {
    width: 100% !important;
    height: 100% !important;
    background-size: contain !important;
    background-repeat: no-repeat !important;
    background-position: center center !important;
    filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.45)) !important;
}

/* Typography phân cấp thị giác rõ ràng, thoáng đãng */
:deep(.timeline-time) {
    display: block;
    font-family: 'TESQSSRUdVTEFSLlRURg', 'Lora', serif !important;
    font-size: 16.5px !important;
    font-weight: 700 !important;
    letter-spacing: 0.8px !important;
    color: #ffffff !important;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5) !important;
    line-height: 1.25 !important;
}

:deep(.timeline-title) {
    display: block;
    font-family: 'TESQSSRUdVTEFSLlRURg', 'Lora', serif !important;
    font-size: 13.5px !important;
    font-weight: 500 !important;
    letter-spacing: 1.5px !important;
    color: rgba(255, 255, 255, 0.95) !important;
    text-transform: uppercase !important;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45) !important;
    margin-top: 4px !important;
    line-height: 1.25 !important;
}

/* --- HIỆU ỨNG UX CUỘN TỚI MỚI CHẠY (SCROLL-TRIGGERED ANIMATIONS) --- */
:deep(#LINE5.ladi-animation) {
    animation: timelineLineGrow 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
}

:deep(#IMAGE24.ladi-animation),
:deep(#BOX9.ladi-animation),
:deep(#HEADLINE39.ladi-animation) {
    animation: timelineItemFadeIn 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both !important;
}

:deep(#IMAGE25.ladi-animation),
:deep(#BOX10.ladi-animation),
:deep(#HEADLINE40.ladi-animation) {
    animation: timelineItemFadeIn 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.28s both !important;
}

:deep(#IMAGE48.ladi-animation),
:deep(#BOX50.ladi-animation),
:deep(#HEADLINE146.ladi-animation) {
    animation: timelineItemFadeIn 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.46s both !important;
}

@keyframes timelineLineGrow {
    0% {
        opacity: 0;
        transform: scaleY(0);
    }

    100% {
        opacity: 1;
        transform: scaleY(1);
    }
}

@keyframes timelineItemFadeIn {
    0% {
        opacity: 0;
        transform: translateY(18px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

:deep(#IMAGE27) {
    width: 75px !important;
    height: 65px !important;
    left: 172.5px !important;
    top: 58px !important;
    opacity: 1 !important;
    visibility: visible !important;
}

:deep(#IMAGE27 > .ladi-image) {
    width: 100% !important;
    height: 100% !important;
}

:deep(#IMAGE27 > .ladi-image > .ladi-image-background) {
    width: 100% !important;
    height: 100% !important;
    background-image: url("/logo.webp") !important;
    background-size: contain !important;
    background-position: center center !important;
    background-repeat: no-repeat !important;
}

/* Lịch Tháng 12/2026 - Mở rộng kích thước & thu hẹp lề trái phải sát mép theo ảnh mẫu */
:deep(#GROUP43) {
    left: 14px !important;
    width: 392px !important;
    height: 340px !important;
}

:deep(#HEADLINE81) {
    width: 392px !important;
    left: 0px !important;
    top: 0px !important;
    height: 64px !important;
}

:deep(#HEADLINE81 > .ladi-headline) {
    font-family: 'MUZUViWSVAtQXJjaXReWEtQmVnYXRyaSvdGY', 'MUZUViWSVAtSElHSCTUElSSVRFRCPVEY', cursive !important;
    font-size: 40px !important;
    line-height: 1.25 !important;
    color: rgb(146, 131, 98) !important;
    text-align: center !important;
    letter-spacing: 0.5px !important;
}

:deep(#GROUP37) {
    width: 392px !important;
    height: 265px !important;
    top: 72px !important;
    left: 0px !important;
}

:deep(#GROUP69) {
    width: 392px !important;
    height: 24px !important;
    top: 0px !important;
    left: 0px !important;
}

:deep(#HEADLINE91),
:deep(#HEADLINE92),
:deep(#HEADLINE93),
:deep(#HEADLINE94),
:deep(#HEADLINE95),
:deep(#HEADLINE96),
:deep(#HEADLINE97) {
    width: 56px !important;
    height: 24px !important;
    top: 0px !important;
    text-align: center !important;
}

:deep(#HEADLINE91) { left: 0px !important; }
:deep(#HEADLINE92) { left: 56px !important; }
:deep(#HEADLINE93) { left: 112px !important; }
:deep(#HEADLINE94) { left: 168px !important; }
:deep(#HEADLINE95) { left: 224px !important; }
:deep(#HEADLINE96) { left: 280px !important; }
:deep(#HEADLINE97) { left: 336px !important; }

:deep(#HEADLINE91 > .ladi-headline),
:deep(#HEADLINE92 > .ladi-headline),
:deep(#HEADLINE93 > .ladi-headline),
:deep(#HEADLINE94 > .ladi-headline),
:deep(#HEADLINE95 > .ladi-headline),
:deep(#HEADLINE96 > .ladi-headline),
:deep(#HEADLINE97 > .ladi-headline) {
    font-family: 'TESQSTRUJQkMRCUVEY', 'TESQSSRUdVTEFSLlRURg', 'Lora', serif !important;
    font-size: 10.5px !important;
    font-weight: 500 !important;
    line-height: 24px !important;
    color: rgb(146, 131, 98) !important;
    text-transform: uppercase !important;
    letter-spacing: 0.2px !important;
    white-space: nowrap !important;
    text-align: center !important;
}

:deep(.calendar-day-number) {
    width: 56px !important;
    height: 26px !important;
    text-align: center !important;
}

:deep(.calendar-day-number > .ladi-headline) {
    font-family: 'TESQSSRUdVTEFSLlRURg', 'Lora', serif !important;
    font-size: 18px !important;
    line-height: 26px !important;
    color: rgb(146, 131, 98) !important;
    text-align: center !important;
}

:deep(.calendar-day-number > .ladi-headline:hover) {
    opacity: 0.8;
}

:deep(.calendar-day-number.is-highlighted > .ladi-headline) {
    font-weight: 700 !important;
    color: rgb(110, 95, 60) !important;
}

:deep(#IMAGE33),
:deep(#IMAGE33 > .ladi-image),
:deep(#IMAGE33 > .ladi-image > .ladi-image-background) {
    width: 46px !important;
    height: 39px !important;
    background-size: contain !important;
    background-repeat: no-repeat !important;
    background-position: center center !important;
}

:deep(#IMAGE33) {
    transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1), top 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Header Album & các ảnh trong SECTION7 căn tâm chuẩn đối xứng */
:deep(#SECTION7 #GROUP75),
:deep(#SECTION7 #BOX14),
:deep(#SECTION7 #GROUP31) {
    left: 0px !important;
    width: 420px !important;
}

:deep(#GROUP31) {
    top: 26px !important;
    height: 46px !important;
}

:deep(#GROUP31 > .ladi-group) {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 100% !important;
    gap: 8px !important;
}

:deep(#HEADLINE140),
:deep(#HEADLINE141),
:deep(#HEADLINE142) {
    position: static !important;
    width: auto !important;
    height: auto !important;
    top: auto !important;
    left: auto !important;
}

:deep(#HEADLINE140 > .ladi-headline),
:deep(#HEADLINE141 > .ladi-headline) {
    font-family: 'TESQSSRUdVTEFSLlRURg', 'Lora', serif !important;
    font-size: 20px !important;
    line-height: 1.2 !important;
    color: #ffffff !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
    white-space: nowrap !important;
    text-align: center !important;
}

:deep(#HEADLINE142 > .ladi-headline) {
    font-family: 'MUZUViWSVAtSElHSCTUElSSVRFRCPVEY', cursive !important;
    font-size: 42px !important;
    line-height: 1 !important;
    color: #ffffff !important;
    white-space: nowrap !important;
    text-align: center !important;
    transform: translateY(-2px) !important;
}

/* Đôn toàn bộ các khung ảnh trong SECTION7 lên sau khi bỏ text giới thiệu và căn tâm đối xứng */
:deep(#BOX42) {
    top: 96px !important;
    left: 20.5px !important;
}

:deep(#BOX43) {
    top: 364px !important;
    left: 20.5px !important;
}

:deep(#BOX44) {
    top: 364px !important;
    left: 255.5px !important;
}

:deep(#BOX45) {
    top: 561px !important;
    left: 255.5px !important;
}

:deep(#GROUP68) {
    top: 760px !important;
    left: 20.5px !important;
}

:deep(#GROUP67) {
    top: 1016px !important;
    left: 20.5px !important;
}

:deep(#SECTION7),
:deep(#SECTION7 #GROUP75),
:deep(#SECTION7 #BOX14) {
    height: 1327px !important;
}

/* Thu gọn khoảng cách SECTION8 sau khi bỏ nút GỬI QUÀ MỪNG CƯỚI */
:deep(#GROUP70) {
    height: 315px !important;
}

:deep(#SECTION8) {
    height: 520px !important;
}

/* SECTION11 tự động co giãn vừa vặn theo nội dung: ít thì ôm gọn, nhiều thì mở rộng tối đa 440px */
:deep(#SECTION11) {
    height: auto !important;
    min-height: 0 !important;
}

:deep(#SECTION11 > .ladi-container) {
    height: auto !important;
    min-height: 0 !important;
}

:deep(#IMAGE72) {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    pointer-events: none !important;
}

:deep(#IMAGE72 > .ladi-image),
:deep(#IMAGE72 > .ladi-image > .ladi-image-background) {
    width: 100% !important;
    height: 100% !important;
    background-size: cover !important;
    background-repeat: repeat-y !important;
    pointer-events: none !important;
}

:deep(#IMAGE73) {
    display: none !important;
}

:deep(#HTML_CODE2) {
    position: relative !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: auto !important;
}

:deep(#HTML_CODE2 > .ladi-html-code) {
    position: relative !important;
    width: 100% !important;
    height: auto !important;
}

:deep(#HTML_CODE2.ladi-animation) {
    animation: fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) both !important;
}

:deep(#jmii-wishes) {
    width: 100% !important;
    height: auto !important;
    padding: 24px 20px 10px !important;
    box-sizing: border-box !important;
    display: flex !important;
    flex-direction: column !important;
}

:deep(#jmii-scroll) {
    width: 100% !important;
    height: auto !important;
    min-height: 0 !important;
    max-height: 440px !important;
    overflow-y: auto !important;
    overflow-x: hidden !important;
    -webkit-overflow-scrolling: touch !important;
    padding-right: 6px !important;
}

/* Đóng gọn footer SECTION9 sau khi bỏ thanh link mạng xã hội / logo */
:deep(#SECTION9) {
    height: 318px !important;
}

:deep(#HEADLINE130) {
    width: 280px !important;
    left: 32px !important;
}

:deep(#HEADLINE130 > .ladi-headline) {
    font-family: 'VVZOSGhVGFMSdGY', 'Great Vibes', 'Playball', 'Lora', cursive, serif !important;
    font-size: 39px !important;
    line-height: 1.3 !important;
    color: #ffffff !important;
    text-align: center !important;
    font-style: italic !important;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.45) !important;
}

@media (max-width: 380px) {

    :deep(#HEADLINE140 > .ladi-headline),
    :deep(#HEADLINE141 > .ladi-headline) {
        font-size: 17px !important;
    }

    :deep(#HEADLINE142 > .ladi-headline) {
        font-size: 36px !important;
    }
}

@media (max-width: 480px) {
    .side-switcher-bar {
        top: 10px;
        right: 10px;
        padding: 3px 4px;
    }

    .side-btn {
        padding: 5px 8px;
        font-size: 11px;
    }

    .guest-quick-input {
        width: 80px;
        font-size: 11px;
    }
}

/* ==========================================================
   JMII WISHES - LOADING, EMPTY STATE & DYNAMIC LIST
   ========================================================== */

/* Trạng thái đang tải */
:deep(.jmii-loading-box) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 10px;
    text-align: center;
}

:deep(.loading-spin-heart) {
    font-size: 32px;
    display: inline-block;
    animation: pulseHeart 1.4s ease-in-out infinite;
}

:deep(.loading-text) {
    margin-top: 10px;
    font-family: 'Lora', Georgia, serif;
    font-size: 13px;
    font-style: italic;
    color: #705628;
    opacity: 0.85;
}

@keyframes pulseHeart {

    0%,
    100% {
        transform: scale(1);
        opacity: 0.8;
    }

    50% {
        transform: scale(1.2);
        opacity: 1;
    }
}

/* Empty State khi chưa có lời chúc nào */
:deep(.jmii-empty-container) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 16px 12px 24px;
    width: 100%;
    box-sizing: border-box;
    animation: fadeInEmpty 0.6s ease-out;
}

@keyframes fadeInEmpty {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

:deep(.empty-icon-box) {
    position: relative;
    width: 72px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle, rgba(162, 149, 120, 0.18) 0%, rgba(255, 255, 255, 0) 72%);
    border-radius: 50%;
    margin-bottom: 8px;
}

:deep(.empty-main-icon) {
    font-size: 40px;
    line-height: 1;
    display: inline-block;
    filter: drop-shadow(0 3px 6px rgba(112, 86, 40, 0.2));
    animation: floatIcon 3.2s ease-in-out infinite;
}

@keyframes floatIcon {

    0%,
    100% {
        transform: translateY(0) rotate(0deg);
    }

    50% {
        transform: translateY(-5px) rotate(3deg);
    }
}

:deep(.empty-sparkle) {
    position: absolute;
    font-size: 14px;
    line-height: 1;
    animation: sparkleTwinkle 2.5s ease-in-out infinite;
}

:deep(.empty-sparkle.sp-1) {
    top: 4px;
    right: 4px;
    animation-delay: 0.3s;
}

:deep(.empty-sparkle.sp-2) {
    bottom: 6px;
    left: 4px;
    animation-delay: 1.2s;
}

@keyframes sparkleTwinkle {

    0%,
    100% {
        opacity: 0.25;
        transform: scale(0.75);
    }

    50% {
        opacity: 1;
        transform: scale(1.2);
    }
}

:deep(.empty-title) {
    font-family: 'Lora', Georgia, serif;
    font-size: 15.5px;
    font-weight: 600;
    color: #705628;
    line-height: 1.4;
    margin: 4px 0 6px;
}

:deep(.empty-desc) {
    font-family: 'Lora', Georgia, serif;
    font-size: 12px;
    color: #84755a;
    line-height: 1.6;
    max-width: 290px;
    margin-bottom: 14px;
    opacity: 0.95;
}

:deep(.empty-action-btn) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 22px;
    background: #a29578;
    color: #ffffff;
    font-family: 'Lora', Georgia, serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.5px;
    border: none;
    border-radius: 22px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(162, 149, 120, 0.35);
    transition: all 0.25s ease;
}

:deep(.empty-action-btn:hover),
:deep(.empty-action-btn:active) {
    background: #877759;
    transform: translateY(-1px);
    box-shadow: 0 6px 14px rgba(162, 149, 120, 0.45);
}

:deep(.empty-quick-wishes) {
    margin-top: 14px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
}

:deep(.quick-chip-label) {
    font-family: 'Lora', Georgia, serif;
    font-size: 11px;
    font-style: italic;
    color: #8c7e65;
    margin-bottom: 2px;
}

:deep(.quick-chip) {
    width: auto;
    max-width: 96%;
    padding: 5px 12px;
    background: rgba(162, 149, 120, 0.1);
    border: 1px dashed rgba(112, 86, 40, 0.3);
    border-radius: 14px;
    font-family: 'Lora', Georgia, serif;
    font-size: 11.5px;
    font-style: italic;
    color: #705628;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

:deep(.quick-chip:hover),
:deep(.quick-chip:active) {
    background: rgba(162, 149, 120, 0.22);
    border-color: #705628;
    transform: scale(1.02);
}

/* Wish Items - Dynamic List */
:deep(.animate-wish) {
    animation: fadeInWish 0.4s ease-out;
}

@keyframes fadeInWish {
    from {
        opacity: 0;
        transform: translateY(-8px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

:deep(.jmii-wish-header) {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px 8px;
    margin-bottom: 4px;
}

:deep(.jmii-side-badge) {
    display: inline-block;
    font-size: 10px;
    padding: 1px 7px;
    border-radius: 8px;
    font-weight: 500;
    line-height: 1.4;
    letter-spacing: 0.2px;
}

:deep(.groom-badge) {
    background: rgba(112, 86, 40, 0.12);
    color: #705628;
    border: 1px solid rgba(112, 86, 40, 0.25);
}

:deep(.bride-badge) {
    background: rgba(206, 129, 142, 0.14);
    color: #9c4b5b;
    border: 1px solid rgba(206, 129, 142, 0.28);
}

:deep(.jmii-attend-badge) {
    display: inline-block;
    font-size: 9.5px;
    padding: 1px 6px;
    border-radius: 8px;
    background: rgba(56, 142, 60, 0.1);
    color: #2e7d32;
    border: 1px solid rgba(56, 142, 60, 0.25);
    font-weight: 500;
}

:deep(.jmii-time) {
    margin-left: auto;
    font-size: 11px;
    font-style: italic;
    color: #9d8f76;
}

:deep(.input-highlight) {
    animation: inputHighlightPulse 1.6s ease-out;
}

@keyframes inputHighlightPulse {
    0% {
        outline: 2px solid #705628;
        box-shadow: 0 0 0 4px rgba(112, 86, 40, 0.35);
    }

    50% {
        outline: 2px solid #705628;
        box-shadow: 0 0 0 7px rgba(112, 86, 40, 0.2);
    }

    100% {
        outline: none;
        box-shadow: none;
    }
}

:deep(.is-loading) {
    opacity: 0.75;
    pointer-events: none;
}

:deep(#BUTTON2) {
    z-index: 99 !important;
}

:deep(#BUTTON2),
:deep(#BUTTON2 .ladi-button),
:deep(#BUTTON2 #BUTTON_TEXT2),
:deep(#BUTTON2 .ladi-headline) {
    cursor: pointer !important;
    pointer-events: auto !important;
    user-select: none;
}
</style>
