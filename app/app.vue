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
                                    <div id="IMAGE15" class="ladi-element ladi-animation">
                                        <div class="ladi-image">
                                            <div class="ladi-image-background"></div>
                                        </div>
                                    </div>
                                    <div id="HEADLINE7" class="ladi-element ladi-animation">
                                        <p class="ladi-headline ladi-transition" v-html="invitationLeadText"></p>
                                    </div>
                                    <div id="HEADLINE9" class="ladi-element ladi-animation">
                                        <p class="ladi-headline ladi-transition">{{ currentSideConfig.secondPersonName
                                            }}<br></p>
                                    </div>
                                    <div id="HEADLINE10" class="ladi-element ladi-animation">
                                        <p class="ladi-headline ladi-transition">&amp;<br></p>
                                    </div>
                                    <div id="HEADLINE11" class="ladi-element ladi-animation">
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
                                    <div id="HEADLINE15" class="ladi-element ladi-animation">
                                        <p class="ladi-headline ladi-transition">Ngày<br></p>
                                    </div>
                                    <div id="HEADLINE16" class="ladi-element ladi-animation">
                                        <p class="ladi-headline ladi-transition">Giờ<br></p>
                                    </div>
                                    <div id="HEADLINE17" class="ladi-element ladi-animation">
                                        <p class="ladi-headline ladi-transition">Phút<br></p>
                                    </div>
                                    <div id="HEADLINE18" class="ladi-element ladi-animation">
                                        <p class="ladi-headline ladi-transition">Giây<br></p>
                                    </div>
                                    <div id="HEADLINE8" class="ladi-element ladi-animation">
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
                    <div id="GROUP11" class="ladi-element ladi-animation">
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
                    <div id="GROUP10" class="ladi-element ladi-animation">
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
                            <div id="HEADLINE29" class="ladi-element ladi-animation">
                                <p class="ladi-headline ladi-transition">{{ currentSideConfig.event.venueTitle }}</p>
                            </div>
                            <div id="HEADLINE30" class="ladi-element ladi-animation">
                                <p class="ladi-headline ladi-transition">{{ currentSideConfig.event.venueAddress }}</p>
                            </div><a :href="currentSideConfig.event.mapUrl" target="_blank" id="GROUP34"
                                class="ladi-element ladi-animation" :data-replace-href="currentSideConfig.event.mapUrl">
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
                            <div id="HEADLINE21" class="ladi-element ladi-animation">
                                <p class="ladi-headline ladi-transition">{{ currentSideConfig.partyLabel }}<br></p>
                            </div>
                            <div id="GROUP66" class="ladi-element">
                                <div class="ladi-group">
                                    <div id="HEADLINE26" class="ladi-element ladi-animation">
                                        <p class="ladi-headline ladi-transition">{{ currentSideConfig.secondPersonName
                                            }}<br></p>
                                    </div>
                                    <div id="HEADLINE27" class="ladi-element ladi-animation">
                                        <p class="ladi-headline ladi-transition">{{ currentSideConfig.firstPersonName }}
                                        </p>
                                    </div>
                                    <div id="HEADLINE28" class="ladi-element ladi-animation">
                                        <p class="ladi-headline ladi-transition">&amp;<br></p>
                                    </div>
                                </div>
                            </div>
                            <div id="HEADLINE32" class="ladi-element ladi-animation">
                                <p class="ladi-headline ladi-transition">Tổ chức tại</p>
                            </div>
                            <div id="GROUP14" class="ladi-element">
                                <div class="ladi-group">
                                    <div id="HEADLINE33" class="ladi-element ladi-animation">
                                        <p class="ladi-headline ladi-transition">{{ currentSideConfig.event.day }}</p>
                                    </div>
                                    <div id="GROUP15" class="ladi-element ladi-animation">
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
                                    <div id="GROUP16" class="ladi-element ladi-animation">
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
                            <div id="HEADLINE36" class="ladi-element ladi-animation">
                                <p class="ladi-headline ladi-transition">{{ currentSideConfig.event.time }}</p>
                            </div>
                            <div id="HEADLINE37" class="ladi-element ladi-animation">
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
                                                    <div id="BOX27" class="ladi-element ladi-animation-hidden">
                                                        <div class="ladi-box ladi-transition"></div>
                                                    </div>
                                                    <div id="BOX28" class="ladi-element ladi-animation-hidden">
                                                        <div class="ladi-box ladi-transition"></div>
                                                    </div>
                                                    <div id="BOX29" class="ladi-element ladi-animation-hidden">
                                                        <div class="ladi-box ladi-transition"></div>
                                                    </div>
                                                    <div id="BOX30" class="ladi-element ladi-animation-hidden">
                                                        <div class="ladi-box ladi-transition"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="BOX31" class="ladi-element ladi-animation-hidden">
                                                <div class="ladi-box ladi-transition"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="GROUP35" class="ladi-element ladi-animation-hidden">
                                        <div class="ladi-group">
                                            <div id="HEADLINE135" class="ladi-element">
                                                <p class="ladi-headline ladi-transition">Dress code<br></p>
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
                            <div id="GROUP36" class="ladi-element ladi-animation">
                                <div class="ladi-group">
                                    <div id="HEADLINE38" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">{{ currentSideConfig.timelineTitle || 'Lịch trình buổi tiệc' }}<br></p>
                                    </div>
                                    <div id="LINE10" class="ladi-element">
                                        <div class="ladi-line">
                                            <div class="ladi-line-container"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="IMAGE24" class="ladi-element ladi-animation">
                                <div class="ladi-image">
                                    <div class="ladi-image-background"></div>
                                </div>
                            </div>
                            <div id="HEADLINE39" class="ladi-element ladi-animation">
                                <p class="ladi-headline ladi-transition">{{ currentSideConfig.timeline[0]?.time }}<br>{{ currentSideConfig.timeline[0]?.title }}</p>
                            </div>
                            <div id="IMAGE25" class="ladi-element ladi-animation">
                                <div class="ladi-image">
                                    <div class="ladi-image-background"></div>
                                </div>
                            </div>
                            <div id="HEADLINE40" class="ladi-element ladi-animation">
                                <p class="ladi-headline ladi-transition">{{ currentSideConfig.timeline[1]?.time }}<br>{{ currentSideConfig.timeline[1]?.title }}</p>
                            </div>
                            <div id="IMAGE48" class="ladi-element ladi-animation">
                                <div class="ladi-image">
                                    <div class="ladi-image-background"></div>
                                </div>
                            </div>
                            <div id="HEADLINE146" class="ladi-element ladi-animation">
                                <p class="ladi-headline ladi-transition">{{ currentSideConfig.timeline[2]?.time }}<br>{{ currentSideConfig.timeline[2]?.title }}<br></p>
                            </div>
                            <div id="LINE5" class="ladi-element">
                                <div class="ladi-line">
                                    <div class="ladi-line-container"></div>
                                </div>
                            </div>
                            <div id="BOX50" class="ladi-element">
                                <div class="ladi-box ladi-transition"></div>
                            </div>
                            <div id="BOX9" class="ladi-element">
                                <div class="ladi-box ladi-transition"></div>
                            </div>
                            <div id="BOX10" class="ladi-element">
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
                    <div id="IMAGE27" class="ladi-element ladi-animation">
                        <div class="ladi-image">
                            <div class="ladi-image-background"></div>
                        </div>
                    </div>
                    <div id="HEADLINE41" class="ladi-element ladi-animation-hidden">
                        <p class="ladi-headline ladi-transition">Tình yêu của anh và em là một hành trình kỳ diệu, vượt
                            qua
                            bao thử thách để cùng nhau bước đến ngày trọng đại <br>– đám cưới của chúng mình.<br>Đám
                            cưới
                            này là lời cam kết chân thành, là sự bắt đầu của một chương mới – nơi chúng ta cùng vun đắp
                            tổ
                            ấm, cùng sẻ chia mọi vui buồn và cùng nắm tay nhau đi đến cuối con đường mang tên hạnh
                            phúc.<br>
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
                            hành trình mới
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
                                <h3 class="ladi-headline ladi-transition">December<br></h3>
                            </div>
                            <div id="GROUP37" class="ladi-element">
                                <div class="ladi-group">
                                    <div id="HEADLINE82" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">1<br></p>
                                    </div>
                                    <div id="HEADLINE83" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">3<br></p>
                                    </div>
                                    <div id="HEADLINE84" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">6<br></p>
                                    </div>
                                    <div id="HEADLINE85" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">7<br></p>
                                    </div>
                                    <div id="HEADLINE86" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">8<br></p>
                                    </div>
                                    <div id="HEADLINE87" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">10<br></p>
                                    </div>
                                    <div id="HEADLINE88" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">13<br></p>
                                    </div>
                                    <div id="HEADLINE89" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">14<br></p>
                                    </div>
                                    <div id="HEADLINE90" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">15<br></p>
                                    </div>
                                    <div id="GROUP69" class="ladi-element">
                                        <div class="ladi-group">
                                            <div id="HEADLINE91" class="ladi-element">
                                                <p class="ladi-headline ladi-transition">mon<br></p>
                                            </div>
                                            <div id="HEADLINE92" class="ladi-element">
                                                <p class="ladi-headline ladi-transition">tue<br></p>
                                            </div>
                                            <div id="HEADLINE93" class="ladi-element">
                                                <p class="ladi-headline ladi-transition">wed</p>
                                            </div>
                                            <div id="HEADLINE94" class="ladi-element">
                                                <p class="ladi-headline ladi-transition">thur<br></p>
                                            </div>
                                            <div id="HEADLINE95" class="ladi-element">
                                                <p class="ladi-headline ladi-transition">fri<br></p>
                                            </div>
                                            <div id="HEADLINE96" class="ladi-element">
                                                <p class="ladi-headline ladi-transition">sat<br></p>
                                            </div>
                                            <div id="HEADLINE97" class="ladi-element">
                                                <p class="ladi-headline ladi-transition">sun<br></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="HEADLINE98" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">24<br></p>
                                    </div>
                                    <div id="HEADLINE99" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">25<br></p>
                                    </div>
                                    <div id="HEADLINE100" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">26<br></p>
                                    </div>
                                    <div id="HEADLINE101" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">27<br></p>
                                    </div>
                                    <div id="HEADLINE102" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">28<br></p>
                                    </div>
                                    <div id="HEADLINE103" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">29<br></p>
                                    </div>
                                    <div id="HEADLINE104" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">30<br></p>
                                    </div>
                                    <div id="HEADLINE105" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">17<br></p>
                                    </div>
                                    <div id="HEADLINE106" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">18<br></p>
                                    </div>
                                    <div id="HEADLINE107" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">19<br></p>
                                    </div>
                                    <div id="HEADLINE108" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">20<br></p>
                                    </div>
                                    <div id="HEADLINE109" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">21<br></p>
                                    </div>
                                    <div id="HEADLINE110" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">22<br></p>
                                    </div>
                                    <div id="HEADLINE111" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">23<br></p>
                                    </div>
                                    <div id="HEADLINE112" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">16<br></p>
                                    </div>
                                    <div id="HEADLINE113" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">9<br></p>
                                    </div>
                                    <div id="HEADLINE114" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">11<br></p>
                                    </div>
                                    <div id="HEADLINE115" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">12<br></p>
                                    </div>
                                    <div id="HEADLINE116" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">4<br></p>
                                    </div>
                                    <div id="HEADLINE117" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">2<br></p>
                                    </div>
                                    <div id="HEADLINE118" class="ladi-element">
                                        <p class="ladi-headline ladi-transition">5<br></p>
                                    </div>
                                    <div id="IMAGE33" class="ladi-element ladi-animation-hidden">
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
                            <div id="HEADLINE119" class="ladi-element ladi-animation-hidden">
                                <p class="ladi-headline ladi-transition">Our wedding album captures the
                                    gentle glow of love — moments of
                                    laughter, tenderness, and forever
                                    promises, wrapped in a dreamy
                                    elegance that will never fade.<br></p>
                            </div>
                            <div id="GROUP31" class="ladi-element ladi-animation-hidden">
                                <div class="ladi-group">
                                    <div id="HEADLINE140" class="ladi-element">
                                        <p class="ladi-headline">golden hour<br></p>
                                    </div>
                                    <div id="HEADLINE141" class="ladi-element">
                                        <p class="ladi-headline">love<br></p>
                                    </div>
                                    <div id="HEADLINE142" class="ladi-element">
                                        <p class="ladi-headline">of</p>
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
                                <form autocomplete="off" method="post" class="ladi-form">
                                    <div id="BUTTON2" class="ladi-element ladi-animation-hidden">
                                        <div class="ladi-button ladi-transition">
                                            <div class="ladi-button-background"></div>
                                            <div id="BUTTON_TEXT2" class="ladi-element ladi-button-headline">
                                                <p class="ladi-headline ladi-transition">GỬI LỜI NHẮN &amp; xác nhận</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="FORM_ITEM2" class="ladi-element">
                                        <div class="ladi-form-item-container">
                                            <div class="ladi-form-item-background"></div>
                                            <div class="ladi-form-item"><input autocomplete="off" tabindex="1"
                                                    name="name" required="" class="ladi-form-control" type="text"
                                                    placeholder="Tên của bạn" value=""></div>
                                        </div>
                                    </div>
                                    <div id="FORM_ITEM3" class="ladi-element">
                                        <div class="ladi-form-item-container">
                                            <div class="ladi-form-item-background"></div>
                                            <div class="ladi-form-item"><textarea autocomplete="off" tabindex="4"
                                                    name="message" required="" class="ladi-form-control"
                                                    placeholder="Gửi lời nhắn đến cô dâu chú rể"></textarea></div>
                                        </div>
                                    </div>
                                    <div id="FORM_ITEM4" class="ladi-element">
                                        <div class="ladi-form-item-container">
                                            <div class="ladi-form-item-background"></div>
                                            <div class="ladi-form-item"><select tabindex="3" name="form_item7"
                                                    class="ladi-form-control ladi-form-control-select" data-selected="">
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
                                                    class="ladi-form-control ladi-form-control-select" data-selected="">
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
                                                    class="ladi-form-control ladi-form-control-select" data-selected="">
                                                    <option value="">Bạn là khách mời của ai?</option>
                                                    <option value="Khách mời cô dâu">Khách mời cô dâu</option>
                                                    <option value="Khách mời chú rể">Khách mời chú rể</option>
                                                </select></div>
                                        </div>
                                    </div><button type="submit" class="ladi-hidden"></button>
                                </form>
                            </div>
                            <div data-action="true" id="BUTTON3" class="ladi-element ladi-animation-hidden">
                                <div class="ladi-button">
                                    <div class="ladi-button-background"></div>
                                    <div id="BUTTON_TEXT3" class="ladi-element ladi-button-headline">
                                        <p class="ladi-headline ladi-transition">GỬI QUÀ MỪNG CƯỚI&nbsp;</p>
                                    </div>
                                </div>
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
                    <div id="HTML_CODE2" class="ladi-element">
                        <div class="ladi-html-code">
                            <div id="jmii-wishes">

                                <!-- TIÊU ĐỀ -->

                                <div class="jmii-title">
                                    YOUR WISHES
                                </div>

                                <div class="jmii-line"></div>

                                <div class="jmii-caption">
                                    Messages from our loved ones
                                </div>


                                <!-- KHUNG CUỘN -->

                                <div id="jmii-scroll">

                                    <div id="jmii-list">
                                        <div class="jmii-wish">
                                            <div class="jmii-name">Ngô Ny</div>
                                            <div class="jmii-message">Chúc mừng hạnh phúc ac</div>
                                        </div>
                                        <div class="jmii-wish">
                                            <div class="jmii-name">Thu A2</div>
                                            <div class="jmii-message">Mong chờ gặp cô dâu chú rễ dễ thương
                                                Cô dâu nhớ lời hứa với bé nha: bận làm cô dâu nhưng cũng đừng quên nghía
                                                thêm ngưu ma vương sơ mi trắng cho bé T 😆</div>
                                        </div>
                                        <div class="jmii-wish">
                                            <div class="jmii-name">Quyen Liu</div>
                                            <div class="jmii-message">Congrats bé Quỳnh &amp; anh Vũ.</div>
                                        </div>
                                        <div class="jmii-wish">
                                            <div class="jmii-name">Anh Lak</div>
                                            <div class="jmii-message">Chúc bé Quỳnh luôn xinh đẹp và hạnh phúc nha</div>
                                        </div>
                                        <div class="jmii-wish">
                                            <div class="jmii-name">Nguyen Hien</div>
                                            <div class="jmii-message">Chúc mừng bạn tui thoát ế</div>
                                        </div>
                                        <div class="jmii-wish">
                                            <div class="jmii-name">Johan</div>
                                            <div class="jmii-message">May your marriage be filled with joy, laughter and
                                                endless love. Wishing you a beautiful wedding day and a wonderful life
                                                together</div>
                                        </div>
                                        <div class="jmii-wish">
                                            <div class="jmii-name">nana</div>
                                            <div class="jmii-message">Congratulations my queen 👸</div>
                                        </div>
                                        <div class="jmii-wish">
                                            <div class="jmii-name">Nhung Le</div>
                                            <div class="jmii-message">See you there!</div>
                                        </div>
                                        <div class="jmii-wish">
                                            <div class="jmii-name">Quỳnh Lan</div>
                                            <div class="jmii-message">em sẵn sàng rồi nha🤩</div>
                                        </div>
                                        <div class="jmii-wish">
                                            <div class="jmii-name">Aung Lay</div>
                                            <div class="jmii-message">Congratulations Our Q 🥰🥰🥰</div>
                                        </div>
                                        <div class="jmii-wish">
                                            <div class="jmii-name">Phan Thị Đài Trang</div>
                                            <div class="jmii-message">Chúc vc Chị mãi yêu thương nhường nhịn nhau suốt
                                                đời
                                            </div>
                                        </div>
                                        <div class="jmii-wish">
                                            <div class="jmii-name">Tuấn (Alton)</div>
                                            <div class="jmii-message">Chúc mừng Quỳnh nha, mãi iu</div>
                                        </div>
                                        <div class="jmii-wish">
                                            <div class="jmii-name">Chị Hạnh</div>
                                            <div class="jmii-message">Chúc mừng hạnh phúc hai bạn! Chúc bạn bước vào
                                                hành
                                                trình mới với thật nhiều yêu thương, bình an và hạnh phúc. Mong rằng tổ
                                                ấm
                                                của hai bạn sẽ luôn tràn ngập tiếng cười, đồng hành cùng nhau vượt qua
                                                mọi
                                                thử thách và nắm tay nhau đến bạc đầu</div>
                                        </div>
                                        <div class="jmii-wish">
                                            <div class="jmii-name">Phú</div>
                                            <div class="jmii-message">Chúc hai anh chị mãi mãi yêu thương, đồng hành và
                                                cùng
                                                nhau viết nên một cuộc sống hôn nhân viên mãn. Trăm năm hạnh phúc!</div>
                                        </div>
                                        <div class="jmii-wish">
                                            <div class="jmii-name">Sahmear Alajmi</div>
                                            <div class="jmii-message">Congratulations! I’m excited for you two and
                                                honored
                                                to attend.</div>
                                        </div>
                                        <div class="jmii-wish">
                                            <div class="jmii-name">Trịnh Minh Giàu</div>
                                            <div class="jmii-message">Chúc chị Quỳnh hạnh phúc bên gia đình mới và sớm
                                                có
                                                thêm nhiều thành viên mới nhen 🤭🤭</div>
                                        </div>
                                        <div class="jmii-wish">
                                            <div class="jmii-name">Hải Yến</div>
                                            <div class="jmii-message">Chúc cô dâu chú rễ trăm năm hạnh phúc 😊</div>
                                        </div>
                                        <div class="jmii-wish">
                                            <div class="jmii-name">Anh Ngàn</div>
                                            <div class="jmii-message">Best wishes on your special day and for a
                                                wonderful
                                                life together</div>
                                        </div>
                                        <div class="jmii-wish">
                                            <div class="jmii-name">Juliaaa</div>
                                            <div class="jmii-message">Good thing takes time ~ cuối cùng thì chị đã tìm
                                                được
                                                bến đỗ của mình. Happy wedding chị iu, hạnh phúc nha 🫶🫶🫶🫶</div>
                                        </div>
                                        <div class="jmii-wish">
                                            <div class="jmii-name">Nguyễn thị thuý hằng</div>
                                            <div class="jmii-message">Chúc 2 bạn mãi hạnh phúc</div>
                                        </div>
                                        <div class="jmii-wish">
                                            <div class="jmii-name">Huỳnh Giao</div>
                                            <div class="jmii-message">Bé iu ơi, e đang hóng tới ngày bé mặc váy cưới lắm
                                                lắm
                                            </div>
                                        </div>
                                        <div class="jmii-wish">
                                            <div class="jmii-name">Dương Thư</div>
                                            <div class="jmii-message">Nôn nao lắm lắm, mong đến ngày được nhìn thấy Chị
                                                Quỳnh măc váy cưới. Chúc chị luôn hạnh phúc, vui vẻ. Em còn nhiều điều
                                                muốn
                                                nói lắm. Nhưng tận đáy lòng, mong chị luôn hạnh phúc. 🥰🥰🥰🥰</div>
                                        </div>
                                        <div class="jmii-wish">
                                            <div class="jmii-name">bé híu xinh gái 😚</div>
                                            <div class="jmii-message">nhất định sẽ có mặt trong ngày trọng đại này 😚
                                            </div>
                                        </div>
                                        <div class="jmii-wish">
                                            <div class="jmii-name">Tilun</div>
                                            <div class="jmii-message">Em chúc chị bé Quỳnh sẽ có 1 cuộc sống viên mãn
                                                bên 1
                                                nửa của mình . Tụi em sẽ quẩy nhiệt tình chung vui cùng cô dâu chú rể
                                                nha .
                                            </div>
                                        </div>
                                        <div class="jmii-wish">
                                            <div class="jmii-name">Huỳnh Vân</div>
                                            <div class="jmii-message">Không những trăm năm mà ngàn năm hạnh phúc nha Mèo
                                            </div>
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
                                <h3 class="ladi-headline ladi-transition">Thank you!<br></h3>
                            </div>
                        </div>
                    </div>
                    <div data-action="true" id="GROUP78" class="ladi-element">
                        <div class="ladi-group">
                            <div id="HEADLINE163" class="ladi-element ladi-animation-hidden">
                                <h3 class="ladi-headline ladi-transition">JMII Wedding Invitation</h3>
                            </div><a href="https://www.facebook.com/profile.php?id=61557384251600" target="_blank"
                                id="IMAGE75" class="ladi-element"
                                data-replace-href="https://www.facebook.com/profile.php?id=61557384251600">
                                <div class="ladi-image ladi-transition">
                                    <div class="ladi-image-background"></div>
                                </div>
                            </a><a href="https://www.tiktok.com/@thiepcuoi.online?is_from_webapp=1&amp;sender_device=pc"
                                target="_blank" id="IMAGE76" class="ladi-element"
                                data-replace-href="https://www.tiktok.com/@thiepcuoi.online?is_from_webapp=1&amp;sender_device=pc">
                                <div class="ladi-image ladi-transition">
                                    <div class="ladi-image-background"></div>
                                </div>
                            </a><a href="https://zalo.me/0968378902" target="_blank" id="IMAGE77" class="ladi-element"
                                data-replace-href="https://zalo.me/0968378902">
                                <div class="ladi-image ladi-transition">
                                    <div class="ladi-image-background"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="SECTION_POPUP" class="ladi-section">
                <div class="ladi-section-background"></div>
                <div class="ladi-container">
                    <div id="POPUP1" class="ladi-element">
                        <div class="ladi-popup">
                            <div class="ladi-popup-background"></div>
                            <div id="IMAGE36" class="ladi-element">
                                <div class="ladi-image ladi-transition">
                                    <div class="ladi-image-background"></div>
                                </div>
                            </div>
                            <div id="GROUP72" class="ladi-element">
                                <div class="ladi-group">
                                    <div id="PARAGRAPH1" class="ladi-element">
                                        <div class="ladi-paragraph ladi-transition">Cảm ơn bạn đã dành thời gian phản
                                            hồi.
                                            <br>Chúng mình vô cùng trân quý sự quan tâm của bạn.<br>
                                        </div>
                                    </div>
                                    <div id="HEADLINE131" class="ladi-element">
                                        <h3 class="ladi-headline ladi-transition">Thank you!<br></h3>
                                    </div>
                                </div>
                            </div>
                            <div id="LINE6" class="ladi-element">
                                <div class="ladi-line">
                                    <div class="ladi-line-container"></div>
                                </div>
                            </div>
                            <div id="PARAGRAPH2" class="ladi-element">
                                <div class="ladi-paragraph ladi-transition">21<br>12<br></div>
                            </div>
                            <div id="GROUP21" class="ladi-element ladi-animation-hidden">
                                <div class="ladi-group">
                                    <div id="IMAGE38" class="ladi-element">
                                        <div class="ladi-image ladi-transition">
                                            <div class="ladi-image-background"></div>
                                        </div>
                                    </div>
                                    <div id="BOX23" class="ladi-element">
                                        <div class="ladi-box ladi-transition"></div>
                                    </div>
                                </div>
                            </div>
                            <div id="IMAGE40" class="ladi-element">
                                <div class="ladi-image">
                                    <div class="ladi-image-background"></div>
                                </div>
                            </div>
                            <div id="IMAGE49" class="ladi-element">
                                <div class="ladi-image">
                                    <div class="ladi-image-background"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="POPUP2" class="ladi-element">
                        <div class="ladi-popup">
                            <div class="ladi-popup-background"></div>
                            <div id="GROUP52" class="ladi-element">
                                <div class="ladi-group">
                                    <div id="IMAGE42" class="ladi-element">
                                        <div class="ladi-image ladi-transition">
                                            <div class="ladi-image-background"></div>
                                        </div>
                                    </div>
                                    <div id="HEADLINE132" class="ladi-element">
                                        <h3 class="ladi-headline ladi-transition">{{ currentSideConfig.banking.title }}
                                        </h3>
                                    </div>
                                    <div id="HEADLINE133" class="ladi-element">
                                        <h3 class="ladi-headline ladi-transition">{{
                                            currentSideConfig.banking.accountHolder }}</h3>
                                    </div>
                                    <div id="HEADLINE134" class="ladi-element">
                                        <h3 class="ladi-headline ladi-transition">{{ currentSideConfig.banking.bankName
                                            }}<br>{{ currentSideConfig.banking.accountNumber }}</h3>
                                    </div>
                                    <div id="LINE7" class="ladi-element">
                                        <div class="ladi-line">
                                            <div class="ladi-line-container"></div>
                                        </div>
                                    </div>
                                    <div id="IMAGE43" class="ladi-element">
                                        <div class="ladi-image ladi-transition">
                                            <div class="ladi-image-background"
                                                :style="currentSideConfig.banking.qrImage ? { backgroundImage: `url('${currentSideConfig.banking.qrImage}')` } : {}">
                                            </div>
                                        </div>
                                    </div>
                                    <div id="BOX24" class="ladi-element">
                                        <div class="ladi-box ladi-transition"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
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

// 2. Tên khách mời từ param URL (?to=, ?guest=, ?name=, ?khach=, ?k=, ?u=)
// Ví dụ: ?to=Anh Hoàng -> TRÂN TRỌNG KÍNH MỜI ANH HOÀNG ĐẾN DỰ LỄ ĂN HỎI CỦA
const guestName = computed(() => {
    const q = route.query
    const raw = q.to || q.guest || q.name || q.khach || q.k || q.u
    return raw ? String(raw).trim() : ''
})

const invitationLeadText = computed(() => {
    return formatInvitationLead(guestName.value)
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

// 1. Mobile Viewport Auto-scaling
const initViewport = () => {
    if (typeof window === 'undefined') return
    const applyViewport = () => {
        const w = window.innerWidth
        let content = 'width=420, user-scalable=no, initial-scale=1.0'
        if (w <= 480 && w > 0) {
            const scale = w / 420
            content = 'width=420, user-scalable=no, initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale
        }
        let vp = document.getElementById('viewport')
        if (!vp) {
            vp = document.createElement('meta')
            vp.id = 'viewport'
            vp.setAttribute('name', 'viewport')
            document.head.appendChild(vp)
        }
        vp.setAttribute('content', content)
    }

    applyViewport()
    window.addEventListener('resize', applyViewport)
}

// 2. Audio Player Logic (iOS + Android + Desktop)
const initAudio = () => {
    audio = new Audio('https://camcui.vn/bai157.mp3')
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
let section2ScrollHandler: (() => void) | null = null
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
        if (section2ScrollHandler) {
            window.removeEventListener('scroll', section2ScrollHandler)
            section2ScrollHandler = null
        }
        if (section2Observer) {
            section2Observer.disconnect()
            section2Observer = null
        }
    }

    // Trigger Section 2 with zero layout thrashing on first scroll
    section2ScrollHandler = () => {
        if (window.scrollY > 15) {
            triggerSection2()
        }
    }
    window.addEventListener('scroll', section2ScrollHandler, { passive: true })

    if ('IntersectionObserver' in window) {
        const sec2 = document.getElementById('SECTION2')
        if (sec2) {
            section2Observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && window.scrollY > 15) {
                        triggerSection2()
                    }
                })
            }, {
                root: null,
                rootMargin: '0px 0px -40px 0px',
                threshold: 0.05
            })
            section2Observer.observe(sec2)
        }

        // Trigger animation right as element enters visible screen for Sections 3 to 10
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
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.08
        })

        // Observe all hidden elements (excluding SECTION1 and SECTION2)
        document.querySelectorAll('.ladi-animation-hidden').forEach(el => {
            if (el.closest('#SECTION1') || el.closest('#SECTION2')) return
            const rect = el.getBoundingClientRect()
            if (rect.top < window.innerHeight - 50 && rect.bottom > 0) {
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

    // Check immediately if page was reloaded already scrolled down
    if (window.scrollY > 15) {
        triggerSection2()
    }
}

// 5. Popups, Actions & Wishes
const initPopupsAndActions = () => {
    const backdrop = document.getElementById('backdrop-popup')
    const popup1 = document.getElementById('POPUP1') // Thank you popup
    const popup2 = document.getElementById('POPUP2') // Gift / Bank popup
    const popup3 = document.getElementById('POPUP3') // Lightbox gallery

    const closeAllPopups = () => {
        if (backdrop) backdrop.classList.remove('is-active')
        if (popup1) popup1.classList.remove('is-active')
        if (popup2) popup2.classList.remove('is-active')
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

    // BUTTON3: "GỬI QUÀ MỪNG CƯỚI"
    const btnGift = document.getElementById('BUTTON3')
    if (btnGift) {
        btnGift.style.cursor = 'pointer'
        btnGift.addEventListener('click', (e) => {
            e.preventDefault()
            if (backdrop) backdrop.classList.add('is-active')
            if (popup2) popup2.classList.add('is-active')
        })
    }

    // Copy STK in POPUP2 (HEADLINE134)
    const stkEl = document.getElementById('HEADLINE134')
    if (stkEl) {
        stkEl.style.cursor = 'pointer'
        stkEl.setAttribute('title', 'Nhấn để sao chép số tài khoản')
        stkEl.addEventListener('click', () => {
            const accNum = currentSideConfig.value.banking.accountNumber
            if (navigator.clipboard) {
                navigator.clipboard.writeText(accNum)
                showToast(`Đã sao chép số tài khoản: ${accNum}`)
            }
        })
    }

    // Form RSVP Submit (BUTTON2 in FORM2)
    const formEl = document.querySelector('#FORM2 form')
    if (formEl) {
        formEl.addEventListener('submit', (e) => {
            e.preventDefault()
            if (backdrop) backdrop.classList.add('is-active')
            if (popup1) popup1.classList.add('is-active')
            showToast('Cảm ơn bạn đã gửi lời nhắn & xác nhận!')
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

    // Gallery click to open POPUP3
    const galleryItems = document.querySelectorAll('#SECTION7 .ladi-image')
    galleryItems.forEach(item => {
        (item as HTMLElement).style.cursor = 'pointer'
        item.addEventListener('click', () => {
            if (backdrop) backdrop.classList.add('is-active')
            if (popup3) popup3.classList.add('is-active')
        })
    })

    // JMII Wedding Wishes loader
    loadJmiiWishes()
}

// 6. Wishes API Loader (Google Apps Script)
const loadJmiiWishes = () => {
    const WEDDING_ID = 'vuquynh1'
    const API = 'https://script.google.com/macros/s/AKfycbxMQvp2C4Dz6ntvpPoNHzJl0doaknjNmX86VmeI83E64dJ8M25RVl5-t01aqyuZR7PS/exec'
    const listEl = document.getElementById('jmii-list')
    if (!listEl) return

    const callbackName = 'jmiiWishesCallback_' + Date.now() + '_' + Math.floor(Math.random() * 100000)
    const script = document.createElement('script')

        ; (window as any)[callbackName] = (data: any) => {
            if (data && data.success && Array.isArray(data.wishes)) {
                if (data.wishes.length === 0) {
                    listEl.innerHTML = '<div class="jmii-loading">Chưa có lời chúc nào.</div>'
                } else {
                    listEl.innerHTML = ''
                    data.wishes.forEach((w: any) => {
                        const item = document.createElement('div')
                        item.className = 'jmii-wish'
                        const nameEl = document.createElement('div')
                        nameEl.className = 'jmii-name'
                        nameEl.textContent = w.name || 'Khách mời'
                        const msgEl = document.createElement('div')
                        msgEl.className = 'jmii-message'
                        msgEl.textContent = w.content || w.message || ''
                        item.appendChild(nameEl)
                        item.appendChild(msgEl)
                        listEl.appendChild(item)
                    })
                }
            }
            cleanup()
        }

    const cleanup = () => {
        try {
            delete (window as any)[callbackName]
        } catch (e) {
            ; (window as any)[callbackName] = null
        }
        if (script.parentNode) script.parentNode.removeChild(script)
    }

    script.onerror = cleanup
    script.src = API + '?weddingId=' + encodeURIComponent(WEDDING_ID) + '&callback=' + encodeURIComponent(callbackName) + '&t=' + Date.now()
    document.head.appendChild(script)
}

onMounted(() => {
    initViewport()
    initAudio()
    initCountdown()
    initScrollAnimations()
    initPopupsAndActions()
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
    if (section2ScrollHandler) {
        window.removeEventListener('scroll', section2ScrollHandler)
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

/* Tùy biến lời mời khách (HEADLINE7) & Bông hoa lan (IMAGE15) */
:deep(#GROUP6) {
    z-index: 4 !important;
}

:deep(#GROUP6 > .ladi-group > .ladi-element) {
    z-index: 10 !important;
}

:deep(#IMAGE11) {
    z-index: 1 !important;
}

:deep(#IMAGE15) {
    top: -17px !important;
    left: 204.469px !important;
    z-index: 5 !important;
}

:deep(#IMAGE15 > .ladi-image) {
    animation: none !important;
    -webkit-animation: none !important;
    opacity: 1 !important;
    transform: none !important;
}

:deep(#HEADLINE7) {
    width: 236px !important;
    left: 12.469px !important;
    top: 22px !important;
    z-index: 12 !important;
}

:deep(#HEADLINE7 > .ladi-headline) {
    font-size: 10px !important;
    line-height: 1.4 !important;
    letter-spacing: 0.4px !important;
    text-transform: uppercase !important;
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
    font-weight: 700;
    color: #796139;
    letter-spacing: 0.6px;
    text-decoration: underline;
    text-underline-offset: 2px;
    text-decoration-color: rgba(146, 131, 98, 0.4);
    position: relative !important;
    z-index: 12 !important;
}

:deep(#IMAGE8) {
    z-index: 15 !important;
}

:deep(#IMAGE14) {
    z-index: 16 !important;
}

:deep(#GROUP7) {
    z-index: 20 !important;
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
    top: 450px !important;
    width: 380px !important;
    left: 35px !important;
}

:deep(#HEADLINE29 > .ladi-headline) {
    font-size: 17.5px !important;
    line-height: 1.35 !important;
    text-transform: uppercase !important;
    color: rgb(146, 131, 98) !important;
    text-align: center !important;
    letter-spacing: 0.3px;
}

:deep(#HEADLINE30) {
    top: 498px !important;
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
    top: 546px !important;
}

/* Timeline / Lịch trình buổi tiệc */
:deep(#GROUP36),
:deep(#HEADLINE38),
:deep(#HEADLINE39),
:deep(#HEADLINE40),
:deep(#HEADLINE146),
:deep(#IMAGE24),
:deep(#IMAGE25),
:deep(#IMAGE48) {
    opacity: 1 !important;
    visibility: visible !important;
}

:deep(#HEADLINE38) {
    width: 320px !important;
}

:deep(#HEADLINE38 > .ladi-headline) {
    font-family: 'VVZOSGhVGFMSdGY', 'Playball', 'Lora', cursive, serif !important;
    font-size: 28px !important;
    line-height: 1.4 !important;
    color: #ffffff !important;
    text-align: left !important;
    font-style: italic !important;
}

:deep(#LINE10) {
    top: 18px !important;
}

:deep(#HEADLINE39),
:deep(#HEADLINE40),
:deep(#HEADLINE146) {
    width: 190px !important;
    left: 218px !important;
}

:deep(#HEADLINE39 > .ladi-headline),
:deep(#HEADLINE40 > .ladi-headline),
:deep(#HEADLINE146 > .ladi-headline) {
    font-family: 'TESQSSRUdVTEFSLlRURg', 'Lora', serif !important;
    font-size: 15px !important;
    line-height: 1.35 !important;
    letter-spacing: 0.3px !important;
    color: #ffffff !important;
    text-transform: uppercase !important;
    text-align: left !important;
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
</style>
