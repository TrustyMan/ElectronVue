<template>
    <div class="root">
        <div class="matchHistory cardBox">
            <table style="width: 100%">
                <tr class="boxTitle">
                    <th align="left">
                        <img :src="'/src/renderer/assets/img/icons/history.svg'">
                        Match History
                    </th>
                    <th align="left"></th>
                    <th align="left"></th>
                </tr>
                <router-link tag="tr" to="/replay">
                    <td>Ranked</td>
                    <td>Lost</td>
                    <td>January 12, 2019, 1:34 PM</td>
                </router-link>
                <router-link tag="tr" to="/replay">
                    <td>Ranked</td>
                    <td>Won</td>
                    <td>January 12, 2019, 12:02 PM</td>
                </router-link>
                <router-link tag="tr" to="/replay">
                    <td>Ranked</td>
                    <td>Won</td>
                    <td>January 10, 2019, 11:18 AM</td>
                </router-link>
                <router-link tag="tr" to="/replay">
                    <td>Ranked</td>
                    <td>Won</td>
                    <td>January 10, 2019, 10:18 AM</td>
                </router-link>
            </table>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'matchHistory'
  }
</script>