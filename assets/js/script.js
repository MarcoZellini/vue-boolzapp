


const { createApp } = Vue;

createApp({
    data() {
        return {
            newMessage: '',
            searchText: '',
            activeContact: null,
            contacts: [
               {
                    name: 'Michele',
                    avatar: './assets/img/avatar_1.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: './assets/img/avatar_2.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: './assets/img/avatar_3.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: './assets/img/avatar_4.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: './assets/img/avatar_5.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: './assets/img/avatar_6.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: './assets/img/avatar_7.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: './assets/img/avatar_8.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ], 
            answerWritten: true,
            answersList: [
                `Ho fameeee!!! 😭`,
                `Sto studiando, non disturbarmi! 😡`,
                `Ho comprato un nuovo videogioco 😏`,
                `Sta sera mi guardo un film! 😁`,
                `Mi sono sbucciato le ginocchia 😒`,
                `Si`,
                `No`,
                `Forse`
            ],
            activeContactStatus: `Ultimo accesso alle 12:00`
        }
    },
    methods: {

        getMessageHour(contactIndex, messageIndex) {
            const currentHour = this.contacts[contactIndex].messages[messageIndex].date.split(' '); /*[date, hour] */
            const timeList = currentHour[1].split(':'); /* [hh : mm : ss] */
            return `${timeList[0]}:${timeList[1]}`;
        },

        setDate() {
            const date = new Date();
            const day = date.getDay().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear().toString();
            const hour = date.getHours().toString().padStart(2, '0');
            const minute = date.getMinutes().toString().padStart(2, '0');
            const second = date.getSeconds().toString().padStart(2, '0');

            return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
        },

        toActiveContact(i) {
            this.activeContact = i;

            //Se i message_settings sono rimasti aperti vengono chiusi
            this.closeAllMessageSettings();
        },

        sendMessage() {
            //invio messaggio
            if (this.newMessage.trim() !== '') {
                //Aggiungo il messaggio inserito alla lista messaggi del contatto attivo
                this.contacts[this.activeContact].messages.push({
                    date: this.setDate(),
                    message: this.newMessage,
                    status: 'sent'
                });
                this.answerWritten = false;
                this.newMessage = '';
                this.scrollDown();
                this.receiveAnswer();

            }
        },

        receiveAnswer() {
            this.activeContactStatus = 'Sta scrivendo...';

            //Il contatto attivo mi risponde dopo 1 secondo
            //mantengo lo stato online per 2 secondi
            setTimeout(() => {
                this.contacts[this.activeContact].messages.push({
                    date: this.setDate(),
                    message: this.answersList[Math.floor(Math.random() * this.answersList.length)],
                    status: 'received'
                });
                this.scrollDown();
                this.answerWritten = true;
                this.activeContactStatus = 'Online'
            }, 1000);

            //setto lo stato del contatto attivo con l'ultimo accesso all'orario dell'ultimo messaggio
            setTimeout(() => {
                this.activeContactStatus = `Ultimo accesso alle ${this.getMessageHour(this.activeContact, this.contacts[this.activeContact].messages.length - 1)}`;
            }, 2000);
        },

        closeAllMessageSettings() {
            //Chiudo tutti i message_settings quando richiamo questa funzione
            this.contacts[this.activeContact].messages.forEach(element => {
                element.activeSettings = false;
            });
        },

        activeMessageSettings(i) {
            if (!this.contacts[this.activeContact].messages[i].activeSettings) {
                //Prima di aprire il menu di impostazioni, imposto activeSettings su false
                //In questo modo solo il menu del messaggio selezionato sara' attivo
                this.disableActiveChatSettings();
                this.closeAllMessageSettings();
                this.contacts[this.activeContact].messages[i].activeSettings = true;
            } else {
                //Prima di aprire il menu di impostazioni, imposto activeSettings su false
                //In questo modo solo il menu del messaggio selezionato sara' attivo
                this.closeAllMessageSettings();
            }
        },

        toggleActiveChatSettings() {

            if (!this.contacts[this.activeContact].enableChatSettings) {
                this.closeAllMessageSettings()
                this.enebleActiveChatSettings()
            } else {
                this.disableActiveChatSettings()
            }

        },

        enebleActiveChatSettings() {
            this.contacts[this.activeContact].enableChatSettings = true;
        },

        disableActiveChatSettings() {
            this.contacts[this.activeContact].enableChatSettings = false;
        },

        deleteAllMessages () {
            this.contacts[this.activeContact].messages = [];
        },

        deleteChat() {
            if (this.activeContact >= 0) {
                this.contacts.splice(this.activeContact, 1);
                if (this.activeContact > 0) {
                    this.activeContact--;
                } else if (this.activeContact == 0 && this.contacts.length == 0) {
                    this.activeContact = null;
                }
            }
        },

        removeMessage(i) {
            this.contacts[this.activeContact].messages.splice(i, 1);
        },

        cutLastMessage(lastMessage) {
            if (lastMessage.length > 35) {
                lastMessage = lastMessage.slice(0, 35) + '...';
            }
            return lastMessage;
        },

        scrollDown() {
            const chat_messages = this.$refs.chat_messages_ref;
            this.$nextTick(() => {
                chat_messages.scrollTo(
                    {
                        top: chat_messages.scrollHeight,
                        left: 0,
                        behavior: 'smooth'
                    }
                );
            });
        }
    }
}).mount('#app');





