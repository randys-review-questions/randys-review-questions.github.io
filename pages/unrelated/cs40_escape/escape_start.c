#include <stdio.h>
#include <stdlib.h>

/* 
 * reads a line, not including the newline character, from fp and returns 
 * the line as a C-string. The caller is responsible for freeing memory 
 * allocated by this function by calling `free` on the returned pointer.
 */
extern char *read_line(FILE *fp);

/*
 * Checks if `password` is correct and calls correct() if it is and 
 * incorrect() if it is not.
 */
extern void check_password(char *password);

int main()
{
        fprintf(stderr, "Password: ");
        
        /* 
         * Reads a line from stdin, not including the newline character, 
         * and stores it as a C-string in `input` 
         */
        char *input = read_line(stdin);

        check_password(input);

        free(input);
}