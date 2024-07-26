<template>
  <div class="">
    <div
      class="flex items-center border-b-2 drop-shadow-md px-4 py-2 mb-4"
      :elevation="2"
    >
      <v-app-bar-title>Controle de usuário</v-app-bar-title>

      <v-avatar
        class="border-2 border-black"
        image="https://avatars.githubusercontent.com/u/82960620?v=4"
        size="60"
      ></v-avatar>
      <v-text class="mx-4 text-lg">Angelo</v-text>
    </div>
  </div>

  <main class="h-screen">
    <section class="px-4 flex items-center justify-between">
      <v-responsive class="self-start" max-width="350">
        <v-text-field
          label="Busca"
          placeholder="Nome do usuário"
          variant="solo-filled"
          type="input"
        ></v-text-field>
      </v-responsive>

      <v-btn class="w-1/6" variant="outlined">Novo usuário</v-btn>
    </section>

    <section>
      <v-list class="flex gap-5 flex-wrap">
        <v-list-item>
          <v-card class="mx-auto" max-width="344">
            <v-img
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              cover
            ></v-img>

            <v-card-title> Top western road trips </v-card-title>

            <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

            <v-card-actions>
              <v-btn color="orange-lighten-2" text="Explore"></v-btn>

              <v-spacer></v-spacer>

              <v-btn
                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="show = !show"
              ></v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than
                  he could deliver. You won't have time for sleeping, soldier,
                  not with all the bed making you'll be doing. Then we'll go
                  with that data file! Hey, you add a one and two zeros to that
                  or we walk! You're going to do his laundry? I've got to find a
                  way to escape.
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-list-item>

        <v-list-item>
          <v-card class="mx-auto" max-width="344">
            <v-img
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              cover
            ></v-img>

            <v-card-title> Top western road trips </v-card-title>

            <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

            <v-card-actions>
              <v-btn color="orange-lighten-2" text="Explore"></v-btn>

              <v-spacer></v-spacer>

              <v-btn
                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="show = !show"
              ></v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than
                  he could deliver. You won't have time for sleeping, soldier,
                  not with all the bed making you'll be doing. Then we'll go
                  with that data file! Hey, you add a one and two zeros to that
                  or we walk! You're going to do his laundry? I've got to find a
                  way to escape.
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-list-item>
        <v-list-item>
          <v-card class="mx-auto" max-width="344">
            <v-img
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              cover
            ></v-img>

            <v-card-title> Top western road trips </v-card-title>

            <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

            <v-card-actions>
              <v-btn color="orange-lighten-2" text="Explore"></v-btn>

              <v-spacer></v-spacer>

              <v-btn
                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="show = !show"
              ></v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than
                  he could deliver. You won't have time for sleeping, soldier,
                  not with all the bed making you'll be doing. Then we'll go
                  with that data file! Hey, you add a one and two zeros to that
                  or we walk! You're going to do his laundry? I've got to find a
                  way to escape.
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-list-item>

        <v-list-item>
          <v-card class="mx-auto" max-width="344">
            <v-img
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              cover
            ></v-img>

            <v-card-title> Top western road trips </v-card-title>

            <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

            <v-card-actions>
              <v-btn color="orange-lighten-2" text="Explore"></v-btn>

              <v-spacer></v-spacer>

              <v-btn
                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="show = !show"
              ></v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than
                  he could deliver. You won't have time for sleeping, soldier,
                  not with all the bed making you'll be doing. Then we'll go
                  with that data file! Hey, you add a one and two zeros to that
                  or we walk! You're going to do his laundry? I've got to find a
                  way to escape.
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-list-item>

        <v-list-item>
          <v-card class="mx-auto" max-width="344">
            <v-img
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              cover
            ></v-img>

            <v-card-title> Top western road trips </v-card-title>

            <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

            <v-card-actions>
              <v-btn color="orange-lighten-2" text="Explore"></v-btn>

              <v-spacer></v-spacer>

              <v-btn
                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="show = !show"
              ></v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than
                  he could deliver. You won't have time for sleeping, soldier,
                  not with all the bed making you'll be doing. Then we'll go
                  with that data file! Hey, you add a one and two zeros to that
                  or we walk! You're going to do his laundry? I've got to find a
                  way to escape.
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-list-item>
        <v-list-item>
          <v-card class="mx-auto" max-width="344">
            <v-img
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              cover
            ></v-img>

            <v-card-title> Top western road trips </v-card-title>

            <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

            <v-card-actions>
              <v-btn color="orange-lighten-2" text="Explore"></v-btn>

              <v-spacer></v-spacer>

              <v-btn
                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="show = !show"
              ></v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than
                  he could deliver. You won't have time for sleeping, soldier,
                  not with all the bed making you'll be doing. Then we'll go
                  with that data file! Hey, you add a one and two zeros to that
                  or we walk! You're going to do his laundry? I've got to find a
                  way to escape.
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-list-item>

        <v-list-item>
          <v-card class="mx-auto" max-width="344">
            <v-img
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              cover
            ></v-img>

            <v-card-title> Top western road trips </v-card-title>

            <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

            <v-card-actions>
              <v-btn color="orange-lighten-2" text="Explore"></v-btn>

              <v-spacer></v-spacer>

              <v-btn
                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="show = !show"
              ></v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than
                  he could deliver. You won't have time for sleeping, soldier,
                  not with all the bed making you'll be doing. Then we'll go
                  with that data file! Hey, you add a one and two zeros to that
                  or we walk! You're going to do his laundry? I've got to find a
                  way to escape.
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-list-item>

        <v-list-item>
          <v-card class="mx-auto" max-width="344">
            <v-img
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              cover
            ></v-img>

            <v-card-title> Top western road trips </v-card-title>

            <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

            <v-card-actions>
              <v-btn color="orange-lighten-2" text="Explore"></v-btn>

              <v-spacer></v-spacer>

              <v-btn
                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="show = !show"
              ></v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than
                  he could deliver. You won't have time for sleeping, soldier,
                  not with all the bed making you'll be doing. Then we'll go
                  with that data file! Hey, you add a one and two zeros to that
                  or we walk! You're going to do his laundry? I've got to find a
                  way to escape.
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-list-item>
        <v-list-item>
          <v-card class="mx-auto" max-width="344">
            <v-img
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              cover
            ></v-img>

            <v-card-title> Top western road trips </v-card-title>

            <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

            <v-card-actions>
              <v-btn color="orange-lighten-2" text="Explore"></v-btn>

              <v-spacer></v-spacer>

              <v-btn
                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="show = !show"
              ></v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than
                  he could deliver. You won't have time for sleeping, soldier,
                  not with all the bed making you'll be doing. Then we'll go
                  with that data file! Hey, you add a one and two zeros to that
                  or we walk! You're going to do his laundry? I've got to find a
                  way to escape.
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-list-item>

        <v-list-item>
          <v-card class="mx-auto" max-width="344">
            <v-img
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              cover
            ></v-img>

            <v-card-title> Top western road trips </v-card-title>

            <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

            <v-card-actions>
              <v-btn color="orange-lighten-2" text="Explore"></v-btn>

              <v-spacer></v-spacer>

              <v-btn
                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="show = !show"
              ></v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than
                  he could deliver. You won't have time for sleeping, soldier,
                  not with all the bed making you'll be doing. Then we'll go
                  with that data file! Hey, you add a one and two zeros to that
                  or we walk! You're going to do his laundry? I've got to find a
                  way to escape.
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-list-item>

        <v-list-item>
          <v-card class="mx-auto" max-width="344">
            <v-img
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              cover
            ></v-img>

            <v-card-title> Top western road trips </v-card-title>

            <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

            <v-card-actions>
              <v-btn color="orange-lighten-2" text="Explore"></v-btn>

              <v-spacer></v-spacer>

              <v-btn
                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="show = !show"
              ></v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than
                  he could deliver. You won't have time for sleeping, soldier,
                  not with all the bed making you'll be doing. Then we'll go
                  with that data file! Hey, you add a one and two zeros to that
                  or we walk! You're going to do his laundry? I've got to find a
                  way to escape.
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-list-item>
        <v-list-item>
          <v-card class="mx-auto" max-width="344">
            <v-img
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              cover
            ></v-img>

            <v-card-title> Top western road trips </v-card-title>

            <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

            <v-card-actions>
              <v-btn color="orange-lighten-2" text="Explore"></v-btn>

              <v-spacer></v-spacer>

              <v-btn
                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="show = !show"
              ></v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than
                  he could deliver. You won't have time for sleeping, soldier,
                  not with all the bed making you'll be doing. Then we'll go
                  with that data file! Hey, you add a one and two zeros to that
                  or we walk! You're going to do his laundry? I've got to find a
                  way to escape.
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-list-item>
      </v-list>
    </section>

    <div>
      <v-pagination :length="4"></v-pagination>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    show: false,
  }),
};
</script>

