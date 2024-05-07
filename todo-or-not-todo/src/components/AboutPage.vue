<template>
    <div class="bg-image">
        <div>
    <div class="header">
        {{ $t("aboutus") }}
    </div>
    <div class="content">
        {{ $t("aboutPageText1") }}
        {{ $t("aboutPageText2") }}
        {{ $t("aboutPageText3") }}
        {{ $t("aboutPageText4") }}
        {{ $t("aboutPageText5") }}
    </div>
</div>
</div>
</template>

<style scoped>

.bg-image {
    background-image: url('https://i.imgur.com/I4IF27V.jpg');
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.header {
    font-size: 48px;
    padding: 20px;
    margin-top: 20px;
    color: #018281;
    background-color: #ccc; 
    border-radius: 10px;
}

.content {
    padding: 40px;
    color: #018281;
    background-color: #ccc;
    margin: 20px;
    border-radius: 10px;
    max-width: 800px;
    line-height: 1.5;
    font-size: 18px;
}
</style>