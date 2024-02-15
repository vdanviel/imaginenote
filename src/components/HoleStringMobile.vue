<template>
  <div class="overflow-x-auto m-[25px]">
    <table class="w-full table-fixed">
      <!-- Cabeçalho da tabela -->
      <thead>
        <tr>
            <th class="border-gray-500 p-1">
                <NoteButton note="E" />
            </th>
            <th class="border-gray-500 p-1">
                <NoteButton note="A" />
            </th>
            <th class="border-gray-500 p-1">
                <NoteButton note="D" />
            </th>
            <th class="border-gray-500 p-1">
                <NoteButton note="G" />
            </th>
            <th class="border-gray-500 p-1">
                <NoteButton note="B" />
            </th>
            <th class="border-gray-500 p-1">
                <NoteButton note="E" />
            </th>
        </tr>
      </thead>

      <!-- Corpo da tabela -->
      <tbody>
        <tr v-for="(note, i) in string_arrays.string_six" :key="i">
          <td class="border-l-2 border-r-2 border-gray-500 p-1">
            <NoteButton :note="note" />
          </td>
          <td class="border-r-2 border-gray-500 p-1">
            <NoteButton :note="string_arrays.string_five[i]" />
          </td>
          <td class="border-r-2 border-gray-500 p-1">
            <NoteButton :note="string_arrays.string_four[i]" />
          </td>
          <td class="border-r-2 border-gray-500 p-1">
            <NoteButton :note="string_arrays.string_three[i]" />
          </td>
          <td class="border-r-2 border-gray-500 p-1">
            <NoteButton :note="string_arrays.string_two[i]" />
          </td>
          <td class="border-r-2 border-gray-500 p-1">
            <NoteButton :note="string_arrays.string_one[i]" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>

<script setup>
  import NoteButton from "./NoteButton.vue";


    //console.log();


    //const string_arrays = async fetch('http://127.0.0.1:8000/api/guitar/' + )
    
    
    /* {
        string_six: ['F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
        string_five: ['A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
        string_four: ['D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'],
        string_three: ['G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'],
        string_two: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#'],
        string_one: ['F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    } */



</script>