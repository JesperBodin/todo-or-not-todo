<template>
    <div class="bg-image">
        <div>
    <div class="header">
        {{ $t("aboutus") }}
    </div>
    <div class="content">
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident,
        sunt in culpa qui officia deserunt mollit anim id est laborum."
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