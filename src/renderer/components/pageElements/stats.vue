<template>
    <div class="root">
        <table class="cardBox stats">
            <tr class="boxTitle">
                <th align="left">
                    <img :src="'/src/renderer/assets/img/icons/stats.svg'">
                    Statistics
                </th>
                <th align="left"></th>
                <th align="left"></th>
            </tr>
            <tr>
                <td>Win/Loss</td>
                <td></td>
                <td>51.4%</td>                
            </tr>
            <tr>
                <td>Wins</td>
                <td></td>
                <td>94</td>                
            </tr>
            <tr>
                <td>Losses</td>
                <td></td>
                <td>98</td>                
            </tr>
            <tr>
                <td>Kill/Death</td>
                <td></td>
                <td>42.99%</td>                
            </tr>
            <tr>
                <td>Kills</td>
                <td></td>
                <td>188</td>                
            </tr>
            <tr>
                <td>Deaths</td>
                <td></td>
                <td>199</td>                
            </tr>
        </table>
    </div>
</template>
<script>
  export default {
    name: 'stats'
  }
</script>