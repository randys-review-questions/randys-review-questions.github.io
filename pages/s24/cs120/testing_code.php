<style type="text/css">
    /* div,p */
    /* div + p */
    div p {
        color: red;
    }
</style>

<div>
    <p>This text is colored red.</p>
</div>

<div style="border:1px solid black;">
    <p style="border:1px solid green;width:200px;margin:0 auto;">
        This text should be centered.
    </p>
</div>

<script>
    if (true) {
        var num = prompt("Please enter a number to double:");
    }
    console.log(num + num);

    myArr = [1, 2, 3, 4, 5];
    console.log(myArr.map((x) => (x * 2)));
</script>

<?php
    $events = array();
    $event = "New Event";
    array_push($events, $event);
    echo "<p>" . json_encode($events) . "</p>";
?>